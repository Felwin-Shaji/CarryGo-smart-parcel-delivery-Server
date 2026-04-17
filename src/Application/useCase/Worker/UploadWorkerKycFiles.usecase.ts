    import { inject, injectable } from "tsyringe";
    import { WorkerKYCFileFields } from "../../../Infrastructure/services/storage/multer";
    import { IStorageService } from "../../interfaces/services_Interfaces/storage-service.interface";
    import { IUploadWorkerKycFilesUsecase, UploadedWorkerKycFiles } from "../../interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";

    @injectable()
    export class UploadWorkerKycFilesUsecase implements IUploadWorkerKycFilesUsecase {
        constructor(
            @inject("IStorageService") private _storage: IStorageService
        ) {}

        async execute(files:WorkerKYCFileFields): Promise<UploadedWorkerKycFiles> {

            const uploaded: UploadedWorkerKycFiles = {};
            if (files.document?.[0]?.buffer) {
                uploaded.document = await this._storage.upload(
                    files.document?.[0]?.buffer,
                    "worker/document"
                );
            }
            if (files.selfie?.[0]?.buffer) {
                uploaded.selfie = await this._storage.upload(
                    files.selfie?.[0]?.buffer,
                    "worker/selfie"
                );
            }
            return  uploaded
            ;

        }
    }