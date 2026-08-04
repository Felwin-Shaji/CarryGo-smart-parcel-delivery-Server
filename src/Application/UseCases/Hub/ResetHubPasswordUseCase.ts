import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IPasswordService } from "../../Interfaces/Services/IPasswordService";
import { IResetHubPasswordUseCase } from "../../Interfaces/UseCases/Hub/IResetHubPasswordUseCase";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { HubResetPasswordRequestDTO } from "../../DTOs/Hub/HubProfileDTO";

@injectable()
export class ResetHubPasswordUseCase implements IResetHubPasswordUseCase {
    constructor(
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IPasswordService") private _passwordService: IPasswordService
    ) { };

    async execute(hubId: string, dto: HubResetPasswordRequestDTO): Promise<void> {
        const hubData = await this._hubRepo.findById({ _id: hubId });

        if (!hubData || !hubData.password) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const isPasswordMatch = await this._passwordService.comparePassword(dto.currentPassword, hubData.password);
        if (!isPasswordMatch) throw new AppError(USER_MESSAGES.PASSWORD_NOT_MATCHED, STATUS.BAD_REQUEST);

        const newHashedPassword = await this._passwordService.hashPassword(dto.newPassword);

        const updatedHubData = await this._hubRepo.findOneAndUpdate({ _id: hubId }, { password: newHashedPassword })
        if (!updatedHubData) throw new AppError(USER_MESSAGES.RESET_PASSWORD_FAILURE, STATUS.NOT_FOUND)

        return
    }
}