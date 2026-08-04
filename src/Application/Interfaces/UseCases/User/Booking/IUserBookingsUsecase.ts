import { BookingFilterDTO, BookingListResponseDTO } from "../../../../DTOs/User/Booking.dto";

export interface IUserBookingsUsecase {
    execute(userId: string, dto: BookingFilterDTO): Promise<BookingListResponseDTO>;
}