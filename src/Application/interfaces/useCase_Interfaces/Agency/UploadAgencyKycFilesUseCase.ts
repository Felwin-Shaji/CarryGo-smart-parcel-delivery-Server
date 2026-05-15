import { AgencyKYCFileFields } from "../../../../Infrastructure/services/storage/multer.js";
import { UploadedKycFiles } from "../../../Dto/Agency/agency.dto.js";


export interface IUploadAgencyKycFilesUseCase  {
    execute(files:AgencyKYCFileFields): Promise<UploadedKycFiles>;
}

