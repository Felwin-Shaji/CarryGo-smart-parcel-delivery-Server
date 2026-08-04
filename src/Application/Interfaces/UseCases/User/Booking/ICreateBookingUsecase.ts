import { CreateBookingRequestDTO } from "../../../../DTOs/User/BookingDTO";

export interface ICreateBookingUsecase {
    execute(userId: string, payload: CreateBookingRequestDTO): Promise<{ bookingId: string }>;
}
