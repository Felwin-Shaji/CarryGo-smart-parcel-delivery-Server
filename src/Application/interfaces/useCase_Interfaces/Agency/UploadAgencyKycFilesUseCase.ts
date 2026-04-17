import { UploadedKycFiles } from "@/Application/Dto/Agency/agency.dto.js";
import { AgencyKYCFileFields } from "../../../../Infrastructure/services/storage/multer.js";


export interface IUploadAgencyKycFilesUseCase  {
    execute(files:AgencyKYCFileFields): Promise<UploadedKycFiles>;
}

