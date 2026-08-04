import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IPasswordService } from "../../Interfaces/Services/IPasswordService";
import { IResetAgencyPasswordUseCase } from "../../Interfaces/UseCases/Agency/IResetAgencyPasswordUseCase";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/IAgencyRepository";
import { AgencyResetPasswordRequestDTO } from "../../DTOs/Agency/AgencyProfileDTO";

@injectable()
export class ResetAgencyPasswordUseCase implements IResetAgencyPasswordUseCase {
    constructor(
         @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IPasswordService") private __passwordService: IPasswordService

    ) {};

    async execute(agencyId: string, dto: AgencyResetPasswordRequestDTO): Promise<void> {
        const agencyData = await this._agencyRepo.findById({ _id: agencyId });

        if (!agencyData || !agencyData.password) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const isPasswordMatch = await this.__passwordService.comparePassword(dto.currentPassword, agencyData.password);
        if (!isPasswordMatch) throw new AppError(USER_MESSAGES.PASSWORD_NOT_MATCHED, STATUS.BAD_REQUEST);

        const newHashedPassword = await this.__passwordService.hashPassword(dto.newPassword);

        const updatedAgencyData = await this._agencyRepo.findOneAndUpdate({ _id: agencyId }, { password: newHashedPassword })
        if (!updatedAgencyData) throw new AppError(USER_MESSAGES.RESET_PASSWORD_FAILURE, STATUS.NOT_FOUND)

        return
    }
}