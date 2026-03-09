import { inject, injectable } from "tsyringe";
import { IBookingPaymentFailedUseCase } from "../../interfaces/useCase_Interfaces/Payment/IBookingPaymentFailedUseCase";
import { IBookingRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";

@injectable()
export class BookingPaymentFailedUseCase implements IBookingPaymentFailedUseCase {
    constructor(
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,

    ) { };

    async execute(bookingId: string, error_description?: string): Promise<void> {
        if (!bookingId) return
        
        const booking = await this._bookingRepo.getBookingById(bookingId);


        console.error(error_description,'sssssssssssssssssssssssssssss')

        if (!booking) return;
        if (booking.payment.paymentStatus === "PAID") return;

        await this._bookingRepo.updatePayment(bookingId,{paymentStatus:"FAILED"})

    }
}