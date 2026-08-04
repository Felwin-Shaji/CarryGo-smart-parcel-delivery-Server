import { inject, injectable } from "tsyringe";
import { AgencyResubmitKycDTO } from "../../DTOs/Agency/agency.dto";
import { IAgencyKYCRepository } from "../../Interfaces/Repositories/Agency/AgencyKYC";
import { AgencyKYCMapper } from "../../Mappers/Agency/AgencyKYCMapper";
import { IRsubmitAgencyKycUseCase } from "../../Interfaces/UseCases/Agency/ResubmitAgencyKycUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/agency.repository";
import { Types } from "mongoose";
import { INotificationService } from "../../Interfaces/Services/Notification/INotificationService";
import { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import { INotificationSocketService } from "../../Interfaces/Services/Notification/INotificationSocketService";


@injectable()
export class RsubmitAgencyKycUseCase implements IRsubmitAgencyKycUseCase {
    constructor(
        @inject("IAgencyKYCRepository") private readonly _kycRepo: IAgencyKYCRepository,
        @inject("IAgencyRepository") private readonly _agencyRepo: IAgencyRepository,

        @inject("IAdminRepository") private readonly _adminRepo: IAdminRepository,
        @inject("INotificationService") private readonly _notificationService: INotificationService,
        @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,

    ) { }
    async execute(dto: AgencyResubmitKycDTO): Promise<AgencyResubmitKycDTO> {
        const agency = await this._agencyRepo.findById({ _id: dto.agencyId });

        if (!agency) throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        if (agency.kycStatus !== "REJECTED") throw new AppError(AGENCY_MESSAGES.CANNOT_RESUBMIT_KYC, STATUS.BAD_REQUEST);

        const agencyId = new Types.ObjectId(dto.agencyId)
        const kycData = await this._kycRepo.findOne({ agencyId: agencyId });
        if (!kycData) throw new AppError(AGENCY_MESSAGES.AGENCY_KYC_NOT_FOUND, STATUS.NOT_FOUND);

        const updatedkyc = await this._kycRepo.findOneAndUpdate({ agencyId: agencyId }, {
            ...dto,
            status: "RESUBMITTED",

            updatedAt: new Date()
        }, {
            rejectionReason: undefined,
        });

        await this._agencyRepo.findOneAndUpdate({ _id: agencyId }, {
            kycStatus: "RESUBMITTED",
        });

        if (!updatedkyc) throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const admin = await this._adminRepo.findOne({});
        if (admin && admin.id) await this._notifyAdmin(agency.name, admin.id.toString());

        return AgencyKYCMapper.toResubmitDTO(updatedkyc);
    }

    private async _notifyAdmin(agencyName: string, adminId: string): Promise<void> {
        const savedNotification = await this._notificationService.createNotification(
            adminId,
            "KYC Resubmitted",
            `Agency ${agencyName || ""} has resubmitted KYC documents.`,
        );
        this._notificationSocketService.emitNotification(adminId, savedNotification);
    }
};