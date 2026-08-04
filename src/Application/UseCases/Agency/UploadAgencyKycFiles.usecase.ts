import { inject, injectable } from "tsyringe";
import { IStorageService } from "../../Interfaces/Services/storage-service.interface";
import { IUploadAgencyKycFilesUseCase } from "../../Interfaces/UseCases/Agency/UploadAgencyKycFilesUseCase";
import { AgencyKYCFileFields } from "../../../Infrastructure/Services/Storage/multer";
import { UploadedKycFiles } from "../../DTOs/Agency/agency.dto";

@injectable()
export class UploadAgencyKycFilesUseCase implements IUploadAgencyKycFilesUseCase {
  constructor(
    @inject("IStorageService") private _storage: IStorageService
  ) { }

  async execute(files: AgencyKYCFileFields) {
    const uploaded: UploadedKycFiles = {}

    if (files.tradeLicenseDocument?.[0]?.buffer) {
      uploaded.tradeLicenseDocument = await this._storage.upload(
        files?.tradeLicenseDocument?.[0]?.buffer,
        "agency/trade-license"
      );
    }

    if (files.PAN_photo?.[0]?.buffer) {
      uploaded.PAN_photo = await this._storage.upload(
        files.PAN_photo?.[0]?.buffer,
        "agency/pan"
      );
    }

    if (files.gst_certificate?.[0]?.buffer) {
      uploaded.gst_certificate = await this._storage.upload(
        files.gst_certificate?.[0]?.buffer,
        "agency/gst"
      );
    }

    return uploaded;
  }
}
