import { WorkerKYCFileFields } from "../../../../Infrastructure/services/storage/multer";

export interface UploadedWorkerKycFiles {
    document?: string;
    selfie?: string;
}


export interface IUploadWorkerKycFilesUsecase {
    execute( files:WorkerKYCFileFields ): Promise<UploadedWorkerKycFiles>;
}