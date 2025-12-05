import { AgencyKYCFileFields } from "../../../../Infrastructure/services/storage/multer.js";


export interface IUploadAgencyKycFilesUseCase  {
    execute(files:AgencyKYCFileFields): Promise<void>;
}

