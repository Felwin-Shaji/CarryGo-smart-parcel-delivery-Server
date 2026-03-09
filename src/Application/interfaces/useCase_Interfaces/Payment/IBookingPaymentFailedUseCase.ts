export interface IBookingPaymentFailedUseCase {
    execute(bookingId: string, error_description?: string): Promise<void>;
}