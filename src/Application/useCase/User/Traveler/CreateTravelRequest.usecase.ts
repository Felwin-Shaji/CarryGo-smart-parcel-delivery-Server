import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../Domain/utils/customError";
import { ICreateTravelRequestUseCase } from "../../../interfaces/useCase_Interfaces/user/Traveler/ICreateTravelRequestUseCase";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { CreateTravelRequestDTO } from "../../../Dto/User/traveler.dto";
import { TravelerMapper } from "../../../Mappers/User/travelerMapper";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";

@injectable()
export class CreateTravelRequestUseCase implements ICreateTravelRequestUseCase {
    constructor(
        @inject("IUserRepository") private readonly _userRepo: IUserRepository,
        @inject("ITravelRequestRepository") private readonly _travelRequestRepo: ITravelRequestRepository
    ) { }

    async execute(travelerId: string, dto: CreateTravelRequestDTO): Promise<void> {

        const user = await this._userRepo.findById({ _id: travelerId });
        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        const startAddress = user.addresses.find(
            (a) => a.id === dto.startAddressId
        );

        const endAddress = user.addresses.find(
            (a) => a.id === dto.endAddressId
        );

        if (!startAddress || !endAddress) {
            throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_SAME_ADDRESS_ERROR, STATUS.BAD_REQUEST);
        };

        if (startAddress.id === endAddress.id) {
            throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_SAME_ADDRESS_ERROR, STATUS.BAD_REQUEST);
        }

        const travelRequest = TravelerMapper.toDomainTravelerKyc(dto, travelerId, startAddress, endAddress);
        await this._travelRequestRepo.create(travelRequest);
    }
}
