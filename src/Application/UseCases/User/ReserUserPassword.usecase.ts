import { inject, injectable } from "tsyringe";
import { IUserReserUserPassword } from "../../Interfaces/UseCases/User/ReserUserPassword.usecase";
import { UserResetPasswordRequestDTO } from "../../DTOs/User/user.dto";
import { IUserRepository } from "../../Interfaces/Repositories/User/user.repository";
import { AppError } from "../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IPasswordService } from "../../Interfaces/Services/password-service.interface";

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