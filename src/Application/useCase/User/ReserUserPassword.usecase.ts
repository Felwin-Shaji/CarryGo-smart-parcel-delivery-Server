import { inject, injectable } from "tsyringe";
import { IUserReserUserPassword } from "../../interfaces/useCase_Interfaces/user/ReserUserPassword.usecase";
import { UserResetPasswordRequestDTO } from "../../Dto/User/user.dto";
import { IUserRepository } from "../../../Infrastructure/Interface/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface";

@injectable()
export class UserReserUserPassword implements IUserReserUserPassword {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IPasswordService") private __passwordService: IPasswordService

    ) { };

    async execute(userId: string, dto: UserResetPasswordRequestDTO): Promise<void> {
        const userData = await this._userRepo.findById({ _id: userId });

        if (!userData || !userData.password) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const isPasswordMatch = await this.__passwordService.comparePassword(dto.currentPassword, userData.password);
        if(!isPasswordMatch) throw new AppError(USER_MESSAGES.PASSWORD_NOT_MATCHED,STATUS.BAD_REQUEST);

        const newHashedPassword = await this.__passwordService.hashPassword(dto.newPassword);

        const updatedUserData = await this._userRepo.findOneAndUpdate({_id:userId},{password:newHashedPassword})
        if(!updatedUserData) throw new AppError(USER_MESSAGES.RESET_PASSWORD_FAILURE,STATUS.NOT_FOUND)

        return
    }
}