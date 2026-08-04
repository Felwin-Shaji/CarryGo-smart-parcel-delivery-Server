import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../Domain/Utils/customError";
import { ICreateTravelRequestUseCase } from "../../../Interfaces/UseCases/User/Traveler/ICreateTravelRequestUseCase";
import { ITravelRequestRepository } from "../../../Interfaces/Repositories/User/ITravelRequestRepository";
import { CreateTravelRequestDTO, TravelerRequestAddressDTO } from "../../../DTOs/User/TravelerDTO";
import { TravelerMapper } from "../../../Mappers/User/TravelerMapper";
import { USER_MESSAGES } from "../../../../Infrastructure/Constants/Messages/userMessage";
import { IUserRepository } from "../../../Interfaces/Repositories/User/IUserRepository";
import { STATUS } from "../../../../Infrastructure/Constants/statusCodes";

@injectable()
export class CreateTravelRequestUseCase implements ICreateTravelRequestUseCase {
    constructor(
        @inject("IUserRepository") private readonly _userRepo: IUserRepository,
        @inject("ITravelRequestRepository") private readonly _travelRequestRepo: ITravelRequestRepository
    ) { }

    async execute(travelerId: string, dto: CreateTravelRequestDTO): Promise<void> {

        const user = await this._userRepo.findById({ _id: travelerId });
        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const startAddress = dto.startAddress as TravelerRequestAddressDTO;
        const endAddress = dto.endAddress as TravelerRequestAddressDTO;

        if (!startAddress || !endAddress) {
            throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_ADDRESS_ERROR, STATUS.BAD_REQUEST);
        };

        if (startAddress.location.lat === endAddress.location.lat && startAddress.location.lng === startAddress.location.lng) {
            throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_SAME_ADDRESS_ERROR, STATUS.BAD_REQUEST);
        }

        const travelRequest = TravelerMapper.toDomainTravelRequest(dto, travelerId, startAddress, endAddress);
        await this._travelRequestRepo.create(travelRequest);
    }
}
