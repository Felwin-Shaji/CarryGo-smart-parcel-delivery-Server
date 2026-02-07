import { UserBookingResponseDTO } from "../../../../Dto/User/Booking.dto";

export interface IUserBookingsUsecase {
    execute(userId: string): Promise<UserBookingResponseDTO[]>
}