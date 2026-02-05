export interface IBookingPaymentSuccessUseCase {
    execute(bookingId: string, razorpayPaymentId: string): Promise<void>;
}
