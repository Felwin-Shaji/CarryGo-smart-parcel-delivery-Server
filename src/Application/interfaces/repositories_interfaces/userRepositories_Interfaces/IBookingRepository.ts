import { Booking } from "../../../../Domain/Entities/Booking/Booking";
import { BookingStatusType, PaymentStatusType } from "../../../../Infrastructure/Types/types";
import { BookingFilterDTO } from "../../../Dto/User/Booking.dto";

export interface IBookingRepository {
    create(booking: Booking): Promise<Booking>

    getBookingById(bookingId: string): Promise<Booking>

    getBooingsByUserId(userId: string, dto: BookingFilterDTO): Promise<{ bookings: Booking[]; totalCount: number; }>;

    updatePayment(
        bookingId: string,
        payment: {
            orderRef?: string;
            paymentRef?: string;
            paymentStatus: PaymentStatusType;
            paidAt?: Date;
        }
    ): Promise<void>;

    updateStatus(bookingId: string, status: BookingStatusType): Promise<void>;

    findByTravelRequestId(travelRequestId: string): Promise<Booking[]>;

}