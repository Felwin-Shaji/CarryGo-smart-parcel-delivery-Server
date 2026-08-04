import { inject, injectable } from "tsyringe";
import { IBookingPaymentFailedUseCase } from "../../Interfaces/UseCases/Payment/IBookingPaymentFailedUseCase";
import { IBookingRepository } from "../../Interfaces/Repositories/User/IBookingRepository";

@injectable()
export class BookingPaymentFailedUseCase implements IBookingPaymentFailedUseCase {
    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

    ) { };

    async execute(bookingId: string, error_description?: string): Promise<void> {
        if (!bookingId) return

        const booking = await this._bookingRepo.getBookingById(bookingId);

        console.error(error_description)

        if (!booking) return;
        if (booking.payment.paymentStatus === "PAID") return;

        await this._bookingRepo.updatePayment(bookingId, { paymentStatus: "FAILED" })

    }
}