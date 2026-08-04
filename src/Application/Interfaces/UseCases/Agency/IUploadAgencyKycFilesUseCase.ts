import { AgencyKYCFileFields } from "../../../../Infrastructure/Services/Storage/multer.js";
import { UploadedKycFiles } from "../../../DTOs/Agency/AgencyDTO.js";


export interface IUploadAgencyKycFilesUseCase  {
    execute(files:AgencyKYCFileFields): Promise<UploadedKycFiles>;
}

