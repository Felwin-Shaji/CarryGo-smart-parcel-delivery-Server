import { inject, injectable } from "tsyringe";
import { IBookingPaymentSuccessUseCase } from "../../interfaces/useCase_Interfaces/Payment/IBookingPaymentSuccessUseCase";
import { Transaction } from "../../../Domain/Entities/Wallet/WalletTransaction";
import { IBookingRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { ITransactionRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { ICreateParcelRouteUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ParcelRoute/ICreateParcelRouteUsecase";

@injectable()
export class BookingPaymentSuccessUseCase implements IBookingPaymentSuccessUseCase {

    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

        @inject("IWalletRepository") private readonly _walletRepo: IWalletRepository,

        @inject("ITransactionRepository") private readonly _transactionRepo: ITransactionRepository,

        @inject("ICreateParcelRouteUsecase") private readonly _createParcelRouteUsecase: ICreateParcelRouteUsecase,
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



        await this._transactionRepo.create(
            new Transaction(
                null,
                adminWallet.id!,
                "HOLD",
                "BOOKING_PAYMENT",
                booking.pricing.totalAmount,
                "SUCCESS",
                adminWallet.balance,
                booking.id!,
                undefined,
                razorpayPaymentId
            )
        );

        await this._bookingRepo.updatePayment(bookingId, {
            paymentRef: razorpayPaymentId,
            paymentStatus: "PAID",
            paidAt: new Date()
        })

        await this._bookingRepo.updateStatus(bookingId, "PAID_PENDING_PICKUP");

        if (booking.deliveryPartnerType === "AGENCY") {
            await this._createParcelRouteUsecase.execute(bookingId)
        }
    }
}
