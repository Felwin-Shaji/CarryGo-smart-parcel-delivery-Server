import { Booking } from "../../../../../Domain/Entities/Booking/Booking";

export interface IGetBookingUsecase {
    execute(bookingId: string): Promise<Booking>
}