import { Booking } from "../../../../Domain/Entities/Booking/Booking";

export interface IBookingRepository {
    create(booking: Booking): Promise<Booking>

    getBookingById(bookingId:string):Promise<Booking>

    getBooingsByUserId(userId:string):Promise<Booking[]>

    updatePayment(
        bookingId: string,
        payment: {
            orderRef?: string;
            paymentRef?: string;
            paymentStatus: string;
            paidAt?: Date;
        }
    ): Promise<void>;

    updateStatus(bookingId: string, status: string): Promise<void>;

}