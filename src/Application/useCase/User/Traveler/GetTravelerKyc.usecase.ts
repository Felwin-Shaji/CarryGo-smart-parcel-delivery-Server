import { inject, injectable } from "tsyringe";
import { GetTravelerKycResponseDTO } from "../../../Dto/User/user.dto";
import { IGetTravelerKycUseCase } from "../../../interfaces/useCase_Interfaces/user/Traveler/IGetTravelerKycUseCase";
import { IHubWorkerKycRepository } from "../../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { AppError } from "../../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { TravelerMapper } from "../../../Mappers/User/travelerMapper";

@injectable()
export class GetTravelerKycUseCase implements IGetTravelerKycUseCase {
    constructor(
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepo: IHubWorkerKycRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { };

    async execute(userId: string): Promise<GetTravelerKycResponseDTO> {
        const user = await this._userRepo.findById({ _id: userId });
        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const kyc = await this._hubWorkerKycRepo.getKycBySubjectId(userId, "user");

        if (!kyc) throw new AppError(USER_MESSAGES.KYC_NOT_FOUND, STATUS.NOT_FOUND);

        return TravelerMapper.toGetTravelerKycResponseDTO(kyc, user);
    }
}