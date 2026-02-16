import { inject, injectable } from "tsyringe";
import { IGetTravelerTripOverviewUseCase } from "../../../interfaces/useCase_Interfaces/user/Traveler/IGetTravelerTripOverviewUseCase";
import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { AppError } from "../../../../Domain/utils/customError";
import { TravelerMapper } from "../../../Mappers/User/travelerMapper";

@injectable()
export class GetTravelerTripOverviewUseCase implements IGetTravelerTripOverviewUseCase {
  constructor(
    @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,

    @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
  ) { }

  async execute(userId: string, travelRequestId: string) {

    const trip = await this._travelRequestRepository.getTravelRequestById(userId, travelRequestId)
    if (!trip) throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_NOT_FOUND, STATUS.NOT_FOUND);

    const bookings = await this._bookingRepo.findByTravelRequestId(travelRequestId);
    return TravelerMapper.toGetTravelRequestByIdResponseDTO(trip, bookings);
  }
}