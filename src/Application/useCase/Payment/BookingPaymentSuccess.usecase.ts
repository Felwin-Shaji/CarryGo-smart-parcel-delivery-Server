import { inject, injectable } from "tsyringe";
import { IBookingPaymentSuccessUseCase } from "../../interfaces/useCase_Interfaces/Payment/IBookingPaymentSuccessUseCase";
import { IBookingRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { ITransactionRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { ICreateParcelRouteUsecase } from "../../interfaces/useCase_Interfaces/Logistics/ParcelRoute/ICreateParcelRouteUsecase";
import { ICreateHubShipmentPickUpUsecase } from "../../interfaces/useCase_Interfaces/Logistics/HubShipment/ICreateHubShipmentPickUpUsecase";
import { TransactionMapper } from "../../Mappers/Wallet/transactionMapper";

@injectable()
export class BookingPaymentSuccessUseCase implements IBookingPaymentSuccessUseCase {

    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

        @inject("IWalletRepository") private readonly _walletRepo: IWalletRepository,

        @inject("ITransactionRepository") private readonly _transactionRepo: ITransactionRepository,

        @inject("ICreateParcelRouteUsecase") private readonly _createParcelRouteUsecase: ICreateParcelRouteUsecase,

        @inject("ICreateHubShipmentPickUpUsecase") private readonly _createHubShipmentPickUpUsecase: ICreateHubShipmentPickUpUsecase
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

        if (booking.deliveryPartnerType === "AGENCY") {

            await this._createParcelRouteUsecase.execute(bookingId)

            await this._createHubShipmentPickUpUsecase.execute(bookingId);
        }
    }
}
