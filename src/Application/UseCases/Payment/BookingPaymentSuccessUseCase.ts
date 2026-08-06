import { inject, injectable } from "tsyringe";
import { IBookingPaymentSuccessUseCase } from "../../Interfaces/UseCases/Payment/IBookingPaymentSuccessUseCase";
import { IBookingRepository } from "../../Interfaces/Repositories/User/IBookingRepository";
import { IWalletRepository } from "../../Interfaces/Repositories/Wallet/IWalletRepository";
import { ITransactionRepository } from "../../Interfaces/Repositories/Wallet/ITransactionRepository";
import { ICreateParcelRouteUsecase } from "../../Interfaces/UseCases/Logistics/ParcelRoute/ICreateParcelRouteUseCase";
import { ICreateHubShipmentPickUpUsecase } from "../../Interfaces/UseCases/Logistics/HubShipment/ICreateHubShipmentPickUpUseCase";
import { TransactionMapper } from "../../Mappers/Wallet/TransactionMapper";
import { INotificationService } from "../../Interfaces/Services/Notification/INotificationService";
import { INotificationSocketService } from "../../Interfaces/Services/Notification/INotificationSocketService";
import { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import logger from "../../../Infrastructure/Logger/logger";

@injectable()
export class BookingPaymentSuccessUseCase implements IBookingPaymentSuccessUseCase {

    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

        @inject("IWalletRepository") private readonly _walletRepo: IWalletRepository,

        @inject("ITransactionRepository") private readonly _transactionRepo: ITransactionRepository,

        @inject("ICreateParcelRouteUsecase") private readonly _createParcelRouteUsecase: ICreateParcelRouteUsecase,

        @inject("ICreateHubShipmentPickUpUsecase") private readonly _createHubShipmentPickUpUsecase: ICreateHubShipmentPickUpUsecase,

        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,
    ) { }

    async execute(bookingId: string, razorpayPaymentId: string): Promise<void> {
        if (!bookingId) return

        const booking = await this._bookingRepo.getBookingById(bookingId);
        if (!booking) return;

        if (booking.payment.paymentStatus === "PAID") return;

        const adminWallet = await this._walletRepo.getAdminWallet();
        if (!adminWallet) return;

        const existingTxn = await this._transactionRepo.findByGatewayReferenceId(razorpayPaymentId);
        if (existingTxn) return;

        // ESCROW HOLD
        adminWallet.hold(booking.pricing.totalAmount);
        await this._walletRepo.update(adminWallet);

        const holdTx = TransactionMapper.createBookingHold(
            adminWallet.id!,
            booking.pricing.totalAmount,
            adminWallet.balance,
            booking.id!,
            razorpayPaymentId
        );

        await this._transactionRepo.create(holdTx);


        await this._bookingRepo.updatePayment(bookingId, {
            paymentRef: razorpayPaymentId,
            paymentStatus: "PAID",
            paidAt: new Date()
        })

        await this._bookingRepo.updateStatus(bookingId, "PAID_PENDING_PICKUP");

        const user = await this._userRepo.findById({ _id: booking.userId });

        if (booking.deliveryPartnerType === "AGENCY" && booking.partnerSnapshot?.partnerId && user?.name) {
            await this._createParcelRouteUsecase.execute(bookingId)
            await this._createHubShipmentPickUpUsecase.execute(bookingId);
            logger.debug(user)
            await this._notifyAgency(
                user.name,
                booking.partnerSnapshot!.partnerId.toString(),
                booking.bookingId
            );
        } else if (booking.deliveryPartnerType === "TRAVELER" && user?.name && booking.travelRequestId) {
            await this._notifyTraveler(
                user.name,
                booking.travelRequestId.toString(),
                booking.bookingId
            );
        }

    };

    private async _notifyAgency(customerName: string, agencyId: string, bookingId: string): Promise<void> {
        const savedNotification =
            await this._notificationService.createNotification(
                agencyId,
                "New Booking Assigned",
                `${customerName} has confirmed payment for booking ${bookingId}. A new parcel is ready for pickup.`,
            );

        this._notificationSocketService.emitNotification(
            agencyId,
            savedNotification
        );
    }

    private async _notifyTraveler(customerName: string, travelerId: string, bookingId: string): Promise<void> {
        const savedNotification =
            await this._notificationService.createNotification(
                travelerId,
                "Booking Confirmed",
                `${customerName} has completed the payment for booking ${bookingId}. Please prepare for parcel pickup.`,
            );

        this._notificationSocketService.emitNotification(
            travelerId,
            savedNotification
        );
    };
}
