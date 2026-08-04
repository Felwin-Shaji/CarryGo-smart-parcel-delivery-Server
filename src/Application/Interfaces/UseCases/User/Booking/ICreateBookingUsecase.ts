import { CreateBookingRequestDTO } from "../../../../DTOs/User/Booking.dto";

export interface ICreateBookingUsecase {
    execute(userId: string, payload: CreateBookingRequestDTO): Promise<{ bookingId: string }>;
}
