import { BookingStatusType } from "@/Infrastructure/Types/types";

export interface IUpdateBookingStatusUsecase {
    execute(userId: string, bookingId: string, status: BookingStatusType): Promise<void>;
} 