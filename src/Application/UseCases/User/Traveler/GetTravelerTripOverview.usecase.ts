import { inject, injectable } from "tsyringe";
import { IGetTravelerTripOverviewUseCase } from "../../../Interfaces/UseCases/User/Traveler/IGetTravelerTripOverviewUseCase";
import { IBookingRepository } from "../../../Interfaces/Repositories/User/IBookingRepository";
import { ITravelRequestRepository } from "../../../Interfaces/Repositories/User/ITravelRequestRepository";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { AppError } from "../../../../Domain/Utils/customError";
import { TravelerMapper } from "../../../Mappers/User/travelerMapper";
import { IUserRepository } from "../../../Interfaces/Repositories/User/user.repository";
import { User } from "../../../../Domain/Entities/User";

@injectable()
export class GetTravelerTripOverviewUseCase implements IGetTravelerTripOverviewUseCase {
  constructor(
    @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,

    @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
    @inject("IUserRepository") private _userRepo: IUserRepository,
  ) { }

  async execute(userId: string, travelRequestId: string) {

    const trip = await this._travelRequestRepository.getTravelRequestById(travelRequestId)
    if (!trip) throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_NOT_FOUND, STATUS.NOT_FOUND);

    if (trip.travelerId !== userId) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.FORBIDDEN);

    const bookings = await this._bookingRepo.findByTravelRequestId(trip.id!);

    const userIds = [...new Set(bookings.map(b => b.userId))];
    const usersList = await this._userRepo.findByIds(userIds);

    const usersMap = new Map<string, User>();

    usersList.forEach(user => {
      if (!user.id) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)
      usersMap.set(user.id, user);
    });

    const response = TravelerMapper.toGetTravelRequestByIdResponseDTO(trip, bookings,usersMap);
    return response
  }
}