import { inject, injectable } from "tsyringe";
import { IGetUserProfileUseCase } from "../../Interfaces/UseCases/User/IGetUserProfileUseCase";
import { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import { UserProfileMapper } from "../../Mappers/User/UserProfileMapper";
import { AppError } from "../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { UserProfileResponseDTO } from "../../DTOs/User/UserDTO";

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