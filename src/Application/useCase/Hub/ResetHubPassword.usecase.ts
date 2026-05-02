import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface";
import { IResetHubPasswordUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IResetHubPasswordUseCase";
import { IHubRepository } from "@/Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { HubResetPasswordRequestDTO } from "@/Application/Dto/Hub/hubProfile.dto";

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