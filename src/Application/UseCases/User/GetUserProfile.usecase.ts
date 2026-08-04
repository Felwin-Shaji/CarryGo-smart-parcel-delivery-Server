import { inject, injectable } from "tsyringe";
import { IGetUserProfileUseCase } from "../../Interfaces/UseCases/User/GetUserProfile.useCase";
import { IUserRepository } from "../../Interfaces/Repositories/User/user.repository";
import { UserProfileMapper } from "../../Mappers/User/userProfileMapper";
import { AppError } from "../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { UserProfileResponseDTO } from "../../DTOs/User/user.dto";

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