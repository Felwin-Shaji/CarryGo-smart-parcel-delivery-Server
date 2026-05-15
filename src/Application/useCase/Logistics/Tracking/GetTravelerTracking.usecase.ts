import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IGetTravelerTrackingUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/Tracking/IGetTravelerTrackingUsecase";
import { TravelerParcelTrackingMapper } from "../../../Mappers/Logistics/TravelerParcelTrackingMapper";
import { USER_MESSAGES } from "../../../..//Infrastructure/constants/messages/userMessage";
import { inject, injectable } from "tsyringe";
import { Role } from "../../../../Infrastructure/Types/types";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/constants/messages/bookingMessages";
import { AppError } from "../../../../Domain/utils/customError";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { TravelerParcelTrackingDTO } from "../../../Dto/Logistics/ParcelTracking.dto";
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