import { inject, injectable } from "tsyringe";
import { KYCStatus } from "../../../Infrastructure/Types/types";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/IAgencyRepository";
import { IUpdateAgencyKycStatusUseCase } from "../../Interfaces/UseCases/Agency/IUpdateAgencyKycStatusUseCase";
import { updateAgencyKycStatusDTO } from "../../DTOs/Agency/AgencyDTO";
import { AppError } from "../../../Domain/Utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { INotificationService } from "../../Interfaces/Services/Notification/INotificationService";
import { INotificationSocketService } from "../../Interfaces/Services/Notification/INotificationSocketService";
import { KycStatus } from "../../../Domain/Enums/KYCStatus";

@injectable()
export class UpdateAgencyKycStatusUseCase implements IUpdateAgencyKycStatusUseCase {
    constructor(
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,

    ) { }

    async execute(agencyId: string, dto: updateAgencyKycStatusDTO): Promise<KYCStatus> {

        const result = await this._agencyRepo.findOneAndUpdate(
            { _id: agencyId },
            { kycStatus: dto.status, rejectReason: dto.rejectReason }
        );

        if (!result || !result.id) throw new AppError(AGENCY_MESSAGES.KYC_STATUS_UPDATION_FAILED, STATUS.NOT_FOUND);

        await this._sendKycNotification(result.id?.toString(), dto, result.name);

        return result.kycStatus;
    };

    private async _sendKycNotification(
        userId: string,
        dto: updateAgencyKycStatusDTO,
        agencyName: string
    ): Promise<void> {

        const { title, message } = this._buildKycMessage(dto, agencyName);

        const savedNotification = await this._notificationService.createNotification(
            userId,
            title,
            message,
        );
        this._notificationSocketService.emitNotification(userId, savedNotification);
    };

    private _buildKycMessage(dto: updateAgencyKycStatusDTO, agencyName: string): {
        title: string;
        message: string;
    } {
        if (dto.status === KycStatus.APPROVED) {
            return {
                title: "KYC Approved",
                message: `KYC for ${agencyName} has been successfully approved.`,
            };
        }

        if (dto.status === KycStatus.REJECTED) {
            return {
                title: "KYC Rejected",
                message: dto.rejectReason
                    ? `KYC rejected: ${dto.rejectReason}`
                    : `KYC for ${agencyName} has been rejected.`,
            };
        }

        return {
            title: "KYC Updated",
            message: `KYC status for ${agencyName} is now ${dto.status}`,
        };
    }
};