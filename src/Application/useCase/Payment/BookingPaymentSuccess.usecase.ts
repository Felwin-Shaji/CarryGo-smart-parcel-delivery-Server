import { inject, injectable } from "tsyringe";
import { IBookingPaymentSuccessUseCase } from "../../interfaces/useCase_Interfaces/Payment/IBookingPaymentSuccessUseCase";
import { Transaction } from "../../../Domain/Entities/Wallet/WalletTransaction";
import { IBookingRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { ITransactionRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";

@injectable()
export class BookingPaymentSuccessUseCase implements IBookingPaymentSuccessUseCase {

    constructor(
        @inject("IBookingRepository") private readonly bookingRepo: IBookingRepository,

        @inject("IWalletRepository") private readonly walletRepo: IWalletRepository,

        @inject("ITransactionRepository") private readonly transactionRepo: ITransactionRepository
    ) { }

    async execute(bookingId: string, razorpayPaymentId: string): Promise<void> {
        if(!bookingId) return 

        const booking = await this.bookingRepo.getBookingById(bookingId);
        if (!booking) return;

        if (booking.payment.paymentStatus === "PAID") return;

        const adminWallet =
            await this.walletRepo.findByOwner("admin", "6916fac9e1872f40684651c2");

        if (!adminWallet) return;

        // 🔒 ESCROW HOLD
        adminWallet.hold(booking.pricing.totalAmount);
        await this.walletRepo.update(adminWallet);

        await this.transactionRepo.create(
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



        await this.bookingRepo.updateStatus(bookingId, "PAID_PENDING_PICKUP");
    }
}
