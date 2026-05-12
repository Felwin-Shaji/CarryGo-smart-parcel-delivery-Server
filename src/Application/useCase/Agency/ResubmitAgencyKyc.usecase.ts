import { inject, injectable } from "tsyringe";
import { AgencyResubmitKycDTO } from "../../Dto/Agency/agency.dto";
import { IAgencyKYCRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/AgencyKYC";
import { AgencyKYCMapper } from "../../Mappers/Agency/AgencyKYCMapper";
import { IRsubmitAgencyKycUseCase } from "../../interfaces/useCase_Interfaces/Agency/ResubmitAgencyKycUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { Types } from "mongoose";
import { INotificationService } from "@/Application/interfaces/services_Interfaces/Notification/INotificationService";
import { IAdminRepository } from "@/Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";
import { INotificationSocketService } from "@/Application/interfaces/services_Interfaces/Notification/INotificationSocketService";


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