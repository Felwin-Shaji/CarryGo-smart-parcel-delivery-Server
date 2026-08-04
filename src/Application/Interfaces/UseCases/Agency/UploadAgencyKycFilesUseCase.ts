import { AgencyKYCFileFields } from "../../../../Infrastructure/Services/Storage/multer.js";
import { UploadedKycFiles } from "../../../DTOs/Agency/agency.dto.js";


export interface IUploadAgencyKycFilesUseCase  {
    execute(files:AgencyKYCFileFields): Promise<UploadedKycFiles>;
}

