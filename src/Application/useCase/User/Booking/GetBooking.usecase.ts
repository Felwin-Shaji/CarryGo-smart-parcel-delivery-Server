import { inject, injectable } from "tsyringe";
import { IGetBookingUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IGetBookingUsecase";
import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { BookingMapper } from "../../../Mappers/User/bookingMapper";
import { BookingDetailsResponse, UserBookingResponseDTO } from "../../../Dto/User/Booking.dto";
import { Booking } from "../../../../Domain/Entities/Booking/Booking";

@injectable()
export class GetBookingUsecase implements IGetBookingUsecase {
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,

    ) { }

    async execute(bookingId: string): Promise<Booking> {
        const booking = await this._bookingRepo.getBookingById(bookingId);

        console.log(booking,"👆👆👆👆👆👆👆👆👆👆👆");

        return booking
    }
}   