import { inject, injectable } from "tsyringe";

import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface";
import { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminRepository";
import { AdminResetPasswordRequestDTO } from "../../Dto/Admin/adminProfile.dto";
import { IResetAdminPasswordUsecase } from "../../interfaces/useCase_Interfaces/Admin/IResetAdminPasswordUscase";

@injectable()
export class ResetAdminPasswordUseCase implements IResetAdminPasswordUsecase {
    constructor(
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IPasswordService") private __passwordService: IPasswordService

    ) { };

    async execute(adminId: string, dto: AdminResetPasswordRequestDTO): Promise<void> {
        const adminData = await this._adminRepo.findById({ _id: adminId });

        if (!adminData || !adminData.password) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const isPasswordMatch = await this.__passwordService.comparePassword(dto.currentPassword, adminData.password);
        if (!isPasswordMatch) throw new AppError(USER_MESSAGES.PASSWORD_NOT_MATCHED, STATUS.BAD_REQUEST);

        const newHashedPassword = await this.__passwordService.hashPassword(dto.newPassword);

        const updatedAdminData = await this._adminRepo.findOneAndUpdate({ _id: adminId }, { password: newHashedPassword })
        if (!updatedAdminData) throw new AppError(USER_MESSAGES.RESET_PASSWORD_FAILURE, STATUS.NOT_FOUND)

        return
    }
}