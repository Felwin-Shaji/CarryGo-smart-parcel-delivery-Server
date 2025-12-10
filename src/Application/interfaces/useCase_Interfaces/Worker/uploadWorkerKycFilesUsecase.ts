export interface IUploadWorkerKycFilesUsecase {
    execute( files:any ): Promise<void>;
}