import { Booking } from "../../../../../Domain/Entities/Booking/Booking";
import { BookingDetailsResponse } from "../../../../Dto/User/Booking.dto";

export interface IGetBookingUsecase {
    // execute(bookingId: string): Promise<BookingDetailsResponse>
    execute(bookingId: string): Promise<Booking>
}