import { BookingFilterDTO, BookingListResponseDTO } from "../../../../DTOs/User/BookingDTO";

export interface IUserBookingsUsecase {
    execute(userId: string, dto: BookingFilterDTO): Promise<BookingListResponseDTO>;
}