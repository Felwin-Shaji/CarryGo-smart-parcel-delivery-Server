import { inject, injectable } from "tsyringe";
import { BookingFilterDTO, BookingListResponseDTO } from "../../../DTOs/User/Booking.dto";
import { IUserBookingsUsecase } from "../../../Interfaces/UseCases/User/Booking/IUserBookingsUsecase";
import { IBookingRepository } from "../../../Interfaces/Repositories/User/IBookingRepository";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/constants/messages/bookingMessages";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { AppError } from "../../../../Domain/Utils/customError";
import { BookingMapper } from "../../../Mappers/User/bookingMapper";

@injectable()
export class UserBookingsUsecase implements IUserBookingsUsecase {
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,

    ) { }
    async execute(userId: string, dto: BookingFilterDTO): Promise<BookingListResponseDTO> {

        const { bookings, totalCount } = await this._bookingRepo.getBooingsByUserId(userId, dto);
        if (!bookings) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND)

        const totalPages = Math.ceil(totalCount / dto.limit);

        const respose = BookingMapper.toUsersBookingListResponseDTO(bookings, totalPages, totalCount);

        return respose
    }
}