import { inject, injectable } from "tsyringe";
import { IEditUserProfileUseCase } from "../../Interfaces/UseCases/User/IEditUserProfileUseCase";
import { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import { EditUserProfileRequestDto } from "../../DTOs/User/UserDTO";
import { AppError } from "../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";

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