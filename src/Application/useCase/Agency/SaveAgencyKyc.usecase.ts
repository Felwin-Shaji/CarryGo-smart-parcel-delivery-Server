import { inject, injectable } from "tsyringe";
import type { IAgencyKYCRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/AgencyKYC";
import type { ISaveAgencyKycUseCase } from "../../interfaces/useCase_Interfaces/Agency/SaveAgencyKycUseCase";
import { AgencyKYC_DTO, UploadedKycFiles } from "../../Dto/Agency/agency.dto";
import { AgencyKYCMapper } from "../../Mappers/Agency/AgencyKYCMapper";
import { AgencyKYC } from "../../../Domain/Entities/Agency/AgencyKYC";
import { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";
import { INotificationService } from "../../interfaces/services_Interfaces/Notification/INotificationService";
import { INotificationSocketService } from "../../interfaces/services_Interfaces/Notification/INotificationSocketService";

@injectable()
export class SaveAgencyKycUseCase implements ISaveAgencyKycUseCase {
  constructor(
    @inject("IAgencyKYCRepository") private readonly _kycRepo: IAgencyKYCRepository,
    @inject("IAdminRepository") private readonly _adminRepo: IAdminRepository,
    @inject("INotificationService") private readonly _notificationService: INotificationService,
    @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,
  ) { }

  async execute(dto: AgencyKYC_DTO, uploadedFiles: UploadedKycFiles): Promise<AgencyKYC> {

    const kycEntity = AgencyKYCMapper.toEntity(dto, uploadedFiles);

    const respose = await this._kycRepo.saveKYC(dto.id, kycEntity);

    const admin = await this._adminRepo.findOne({});
    if (!admin || !admin?.id) return respose;

    await this._notifyAdmin(dto, admin?.id.toString());

    return respose
  }

  private async _notifyAdmin(dto: AgencyKYC_DTO, adminId: string): Promise<void> {
    const savedNotification = await this._notificationService.createNotification(
      adminId,
      "New KYC Submission",
      `A new KYC has been submitted by agency.`
    );
    this._notificationSocketService.emitNotification(adminId, savedNotification);
  }
}
