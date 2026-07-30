import { inject, injectable } from "tsyringe";
import { IUpdateUserKycStatusUseCase } from "../../../interfaces/useCase_Interfaces/user/IUpdateuSERKycStatusUseCase";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { KYCStatus } from "../../../../Infrastructure/Types/types";
import { updateUserKycStatusDTO } from "../../../Dto/User/user.dto";
import { AppError } from "../../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { IAdminRepository } from "../../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminRepository";
import { INotificationService } from "../../../interfaces/services_Interfaces/Notification/INotificationService";
import { INotificationSocketService } from "../../../interfaces/services_Interfaces/Notification/INotificationSocketService";

@injectable()
export class UpdateUserKycStatusUseCase implements IUpdateUserKycStatusUseCase {
    constructor(
        @inject("IUserRepository") private _userRepository: IUserRepository,

        @inject("INotificationService") private readonly _notificationService: INotificationService,
        @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,
    ) { }
    async execute(userId: string, dto: updateUserKycStatusDTO): Promise<KYCStatus> {
        const user = await this._userRepository.findById({ _id: userId });
        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        user.kycStatus = dto.kycStatus;
        user.rejectReason = dto.rejectReason || null;
        const updatedUser = await this._userRepository.findOneAndUpdate(
            { _id: userId },
            user
        );
        if (!updatedUser) throw new AppError(USER_MESSAGES.UPDATE_FAILED, STATUS.INTERNAL_SERVER_ERROR);

        await this._notifyUser(userId, updatedUser.kycStatus);

        return updatedUser.kycStatus;
    };

    private async _notifyUser(userId: string, status: KYCStatus): Promise<void> {
        const savedNotification = await this._notificationService.createNotification(
            userId,
            "KYC Updated",
            `Your KYC status has been updated to ${status}.`
        );

        this._notificationSocketService.emitNotification(
            userId,
            savedNotification
        );
    }
}