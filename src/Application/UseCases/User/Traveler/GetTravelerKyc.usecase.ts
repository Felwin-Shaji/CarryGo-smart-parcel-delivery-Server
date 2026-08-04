import { inject, injectable } from "tsyringe";
import { GetTravelerKycResponseDTO } from "../../../DTOs/User/UserDTO";
import { IGetTravelerKycUseCase } from "../../../Interfaces/UseCases/User/Traveler/IGetTravelerKycUseCase";
import { IHubWorkerKycRepository } from "../../../Interfaces/Repositories/Worker/wrokerKyc.repository";
import { IUserRepository } from "../../../Interfaces/Repositories/User/user.repository";
import { AppError } from "../../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/Constants/Messages/userMessage";
import { STATUS } from "../../../../Infrastructure/Constants/statusCodes";
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