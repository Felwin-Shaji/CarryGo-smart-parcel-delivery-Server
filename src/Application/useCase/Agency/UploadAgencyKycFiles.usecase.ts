import { inject, injectable } from "tsyringe";
import { IStorageService } from "../../interfaces/services_Interfaces/storage-service.interface";
import { AgencyKYC_DTO } from "../../Dto/Agency/agency.dto";
import { IUploadAgencyKycFilesUseCase } from "../../interfaces/useCase_Interfaces/Agency/UploadAgencyKycFilesUseCase";
import { AgencyKYCFileFields } from "../../../Infrastructure/services/storage/multer";

@injectable()
export class UploadAgencyKycFilesUseCase implements IUploadAgencyKycFilesUseCase {
  constructor(
    @inject("IStorageService") private _storage: IStorageService
  ) {}

  async execute(files:AgencyKYCFileFields) {
    const uploaded: any = {};

    if (files.tradeLicenseDocument) {
      uploaded.tradeLicenseDocument = await this._storage.upload(
        files?.tradeLicenseDocument?.[0]?.buffer!,
        "agency/trade-license"
      );
    }

    if (files.PAN_photo) {
      uploaded.PAN_photo = await this._storage.upload(
        files.PAN_photo?.[0]?.buffer!,
        "agency/pan"
      );
    }

    if (files.gst_certificate) {
      uploaded.gst_certificate = await this._storage.upload(
        files.gst_certificate?.[0]?.buffer!,
        "agency/gst"
      );
    }

    return uploaded;
  }
}
