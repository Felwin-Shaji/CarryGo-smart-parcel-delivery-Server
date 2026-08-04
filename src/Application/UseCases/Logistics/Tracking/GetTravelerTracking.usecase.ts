import { IBookingRepository } from "../../../Interfaces/Repositories/User/IBookingRepository";
import { ITravelRequestRepository } from "../../../Interfaces/Repositories/User/ITravelRequestRepository";
import { IUserRepository } from "../../../Interfaces/Repositories/User/user.repository";
import { IGetTravelerTrackingUsecase } from "../../../Interfaces/UseCases/Logistics/Tracking/IGetTravelerTrackingUsecase";
import { TravelerParcelTrackingMapper } from "../../../Mappers/Logistics/TravelerParcelTrackingMapper";
import { USER_MESSAGES } from "../../../../Infrastructure/Constants/Messages/userMessage";
import { inject, injectable } from "tsyringe";
import { Role } from "../../../../Infrastructure/Types/types";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/Constants/Messages/bookingMessages";
import { AppError } from "../../../../Domain/Utils/customError";
import { STATUS } from "../../../../Infrastructure/Constants/statusCodes";
import { TravelerParcelTrackingDTO } from "../../../DTOs/Logistics/ParcelTracking.dto";
@injectable()
export class GetTravelerTrackingUsecase implements IGetTravelerTrackingUsecase {

    constructor(
        @inject("IBookingRepository") private _bookingRepository: IBookingRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("ITravelRequestRepository") private readonly _travelRequestRepo: ITravelRequestRepository
    ) { }

    async execute(bookingId: string, role: Role, userId: string): Promise<TravelerParcelTrackingDTO> {

        console.log(role, userId); // need to impliment validateion


        const booking = await this._bookingRepository.getBookingByBookingId(bookingId);
        if (!booking) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);

        if (!booking.partnerSnapshot?.partnerId) throw new AppError(BOOKING_MESSAGE.NO_TRAVELER_ASSIGNED, STATUS.BAD_REQUEST); //change here

        const travelRequest = await this._travelRequestRepo.getTravelRequestById(booking.partnerSnapshot?.partnerId);
        if (!travelRequest || !travelRequest.travelerId) throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_NOT_FOUND, STATUS.NOT_FOUND);

        const traveler = await this._userRepo.findById({ _id: travelRequest.travelerId });
        if (!traveler) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const respose = TravelerParcelTrackingMapper.toDTO(
            booking,
            travelRequest,
            traveler
        );

        console.log(respose);

        return respose

    }

}