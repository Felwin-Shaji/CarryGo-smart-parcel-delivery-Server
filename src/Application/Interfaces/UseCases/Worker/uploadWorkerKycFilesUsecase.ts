import { WorkerKYCFileFields } from "../../../../Infrastructure/Services/Storage/multer";

export interface UploadedWorkerKycFiles {
    document?: string;
    selfie?: string;
}


export interface IUploadWorkerKycFilesUsecase {
    execute( files:WorkerKYCFileFields ): Promise<UploadedWorkerKycFiles>;
}