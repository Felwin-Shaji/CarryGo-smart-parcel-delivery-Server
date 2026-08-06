import { BookingStatusType } from "../../../../../Infrastructure/Types/CommonTypes";

export interface IUpdateBookingStatusUsecase {
    execute(userId: string, bookingId: string, status: BookingStatusType): Promise<void>;
} 