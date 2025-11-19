import { inject, injectable } from "tsyringe";
import { IStorageService } from "../../interfaces/services_Interfaces/storage-service.interface";
import { AgencyKYC_DTO } from "../../Dto/Agency/agency.dto";
import { IUploadAgencyKycFilesUseCase } from "../../interfaces/useCase_Interfaces/Agency/UploadAgencyKycFilesUseCase";

@injectable()
export class UploadAgencyKycFilesUseCase implements IUploadAgencyKycFilesUseCase {
  constructor(
    @inject("IStorageService") private storage: IStorageService
  ) {}

  async execute(dto: AgencyKYC_DTO) {
    const uploaded: any = {};

    if (dto.tradeLicenseDocument) {
      uploaded.tradeLicenseDocument = await this.storage.upload(
        dto.tradeLicenseDocument,
        "agency/trade-license"
      );
    }

    if (dto.PAN_photo) {
      uploaded.PAN_photo = await this.storage.upload(
        dto.PAN_photo,
        "agency/pan"
      );
    }

    if (dto.gst_certificate) {
      uploaded.gst_certificate = await this.storage.upload(
        dto.gst_certificate,
        "agency/gst"
      );
    }

    return uploaded;
  }
}
