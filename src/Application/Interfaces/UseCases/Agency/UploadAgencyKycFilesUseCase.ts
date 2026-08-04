import { AgencyKYCFileFields } from "../../../../Infrastructure/services/storage/multer.js";
import { UploadedKycFiles } from "../../../DTOs/Agency/agency.dto.js";


export interface IUploadAgencyKycFilesUseCase  {
    execute(files:AgencyKYCFileFields): Promise<UploadedKycFiles>;
}

