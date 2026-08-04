import { inject, injectable } from "tsyringe";
import { IGetUserOverviewUseCase } from "../../Interfaces/UseCases/User/IGetUserOverviewUseCase";
import { IUserRepository } from "../../Interfaces/Repositories/User/user.repository";
import { GetUserOverviewResponseDTO } from "../../DTOs/User/UserDTO";
import { AppError } from "../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IHubWorkerKycRepository } from "../../Interfaces/Repositories/Worker/wrokerKyc.repository";
import { UserMapper } from "../../Mappers/User/userMapper";


@injectable()
export class GetUserOverviewUseCase implements IGetUserOverviewUseCase {
    constructor(
        @inject("IUserRepository") private _userRepository: IUserRepository,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepository: IHubWorkerKycRepository
    ) { };

    async execute(userId: string): Promise<GetUserOverviewResponseDTO> {
        const user = await this._userRepository.findById({ _id: userId });
        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const kyc = await this._hubWorkerKycRepository.getKycBySubjectId(userId, "user");

        const userOverview = UserMapper.toUserOverviewResponseDTO(user, kyc!);

        return userOverview;
    }
}