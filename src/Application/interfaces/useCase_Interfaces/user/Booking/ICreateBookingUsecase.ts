import { CreateBookingRequestDTO } from "../../../../Dto/User/Booking.dto";

export interface ICreateBookingUsecase {
    execute(userId: string, payload: CreateBookingRequestDTO): Promise<{ bookingId: string }>;
}
