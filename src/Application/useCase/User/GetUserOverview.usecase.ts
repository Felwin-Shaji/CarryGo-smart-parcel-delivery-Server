import { inject, injectable } from "tsyringe";
import { IGetUserOverviewUseCase } from "../../interfaces/useCase_Interfaces/user/IGetUserOverviewUseCase";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { GetUserOverviewResponseDTO } from "../../Dto/User/user.dto";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IHubWorkerKycRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
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