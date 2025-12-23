import { inject, injectable } from "tsyringe";
import { IEditUserProfileUseCase } from "../../interfaces/useCase_Interfaces/user/EditUserProfile.usecase";
import { IUserRepository } from "../../../Infrastructure/Interface/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { EditUserProfileRequestDto } from "../../Dto/User/user.dto";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";

@injectable()
export class EditUserProfileUseCase implements IEditUserProfileUseCase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { };

    async execute(userId: string, dto: EditUserProfileRequestDto): Promise<void> {

        const userData = await this._userRepo.findOneAndUpdate({ _id: userId }, dto);
        if (!userData) throw new AppError(USER_MESSAGES.PROFILE_UPDATE_FAILURE);
        
        return
    }
}