import { inject, injectable } from "tsyringe";
import { IGetUserProfileUseCase } from "../../interfaces/useCase_Interfaces/user/GetUserProfile.useCase";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { UserProfileMapper } from "../../Mappers/User/userProfileMapper";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { UserProfileResponseDTO } from "../../Dto/User/user.dto";

@injectable()
export class GetUserProfileUseCase implements IGetUserProfileUseCase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository
    ){}

    async execute(userId: string): Promise<UserProfileResponseDTO> {
        const userData = await this._userRepo.findById({_id:userId});

        if(!userData) throw new AppError(USER_MESSAGES.NOT_FOUND,STATUS.NOT_FOUND)

        const responseData = UserProfileMapper.toGetUserProfileResponseDTO(userData);

        return responseData
    }
}