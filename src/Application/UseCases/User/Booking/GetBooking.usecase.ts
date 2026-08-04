import { inject, injectable } from "tsyringe";
import { IGetBookingUsecase } from "../../../Interfaces/UseCases/User/Booking/IGetBookingUsecase";
import { IBookingRepository } from "../../../Interfaces/Repositories/User/IBookingRepository";
import { Booking } from "../../../../Domain/Entities/Booking/Booking";

@injectable()
export class GetBookingUsecase implements IGetBookingUsecase {
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,

    ) { }

    async execute(bookingId: string): Promise<Booking> {
        const booking = await this._bookingRepo.getBookingById(bookingId);

        return booking
    }
}   