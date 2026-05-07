import { ClientSession } from "mongoose";
import { Booking } from "../../../../Domain/Entities/Booking/Booking";
import { BookingStatusType, PaymentStatusType } from "../../../../Infrastructure/Types/types";
import { BookingFilterDTO } from "../../../Dto/User/Booking.dto";
import { DeliveriesChartRequestDTO, DeliveriesChartResponseDTO } from "@/Application/Dto/Agency/agencyDashboard.dto";

export interface IBookingRepository {
    create(booking: Booking): Promise<Booking>

    getBookingById(bookingId: string): Promise<Booking>

    getBookingByBookingId(bookingId: string): Promise<Booking>

    getBooingsByUserId(userId: string, dto: BookingFilterDTO): Promise<{ bookings: Booking[]; totalCount: number; }>;

    findByIds(bookingIds: string[]): Promise<Booking[]>;

    updatePayment(
        bookingId: string,
        payment: {
            orderRef?: string;
            paymentRef?: string;
            paymentStatus: PaymentStatusType;
            paidAt?: Date;
        }
    ): Promise<void>;

    updateStatus(bookingId: string, status: BookingStatusType, session?: ClientSession): Promise<void>;

    findByTravelRequestId(travelRequestId: string): Promise<Booking[]>;

    updateLogistics(
        bookingId: string,
        update: {
            parcelRouteId: string;
            lastUpdatedAt: Date;
        },
        session?: ClientSession
    ): Promise<void>;

    countDeliveredByAgency(agencyId: string): Promise<number>;

    groupDeliveredByDate(agencyId: string, range: DeliveriesChartRequestDTO): Promise<DeliveriesChartResponseDTO>;
}