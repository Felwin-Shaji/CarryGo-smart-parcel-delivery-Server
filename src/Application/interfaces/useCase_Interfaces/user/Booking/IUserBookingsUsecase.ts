import { BookingFilterDTO, BookingListResponseDTO } from "../../../../Dto/User/Booking.dto";

export interface IUserBookingsUsecase {
    execute(userId: string, dto: BookingFilterDTO): Promise<BookingListResponseDTO>;
}