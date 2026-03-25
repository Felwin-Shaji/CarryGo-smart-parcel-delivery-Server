import { inject, injectable } from "tsyringe";
import { IHubWorkerKycRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { AppError } from "../../../Domain/utils/customError";
import { IUploadWorkerKycFilesUsecase } from "@/Application/interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { IReSubmitWorkerKycUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IReSubmitWorkerKycUseCase";
import { ReSubmitWorkerKycPayloadDTO } from "@/Application/Dto/Workers/worker.dto";
import { WorkerKYCFileFields } from "@/Infrastructure/services/storage/multer";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { IHubWorkerRepository } from "@/Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";

@injectable()
export class ReSubmitWorkerKycUseCase implements IReSubmitWorkerKycUseCase {
    constructor(
        @inject("IHubWorkerKycRepository") private _kycRepo: IHubWorkerKycRepository,
        @inject("IHubWorkerRepository") private _hubWorkerRepository: IHubWorkerRepository,


        @inject("IUploadWorkerKycFilesUsecase") private _uploadWorkerKycFilesUsecase: IUploadWorkerKycFilesUsecase,

    ) { }

    async execute(workerId: string, payload: ReSubmitWorkerKycPayloadDTO, files: WorkerKYCFileFields): Promise<void> {
        const existing = await this._kycRepo.getKycBySubjectId(workerId, "worker");

        if (!existing) {
            throw new AppError(WORKER_MESSAGES.WORKERS_NOT_FOUND, STATUS.NOT_FOUND);
        }

        if (existing.status !== "REJECTED") {
            throw new AppError(WORKER_MESSAGES.KYC_NOT_ELIGIBLE_FOR_RESUBMIT, STATUS.BAD_REQUEST);
        }

        let documentUrl = existing.documentUrl;
        let selfieUrl = existing.selfieUrl;

        if (files.document || files.selfie) {
            const uploadedFiles = await this._uploadWorkerKycFilesUsecase.execute(files);

            if (!uploadedFiles.document && files.document) {
                throw new AppError(WORKER_MESSAGES.DOCUMENT_UPLOAD_FAILED, STATUS.BAD_REQUEST);
            }

            if (!uploadedFiles.selfie && files.selfie) {
                throw new AppError(WORKER_MESSAGES.SELFIE_UPLOAD_FAILED, STATUS.BAD_REQUEST);
            }

            if (uploadedFiles.document) documentUrl = uploadedFiles.document;
            if (uploadedFiles.selfie) selfieUrl = uploadedFiles.selfie;
        }


        existing.idType = payload.idType;
        existing.idNumberEncrypted = payload.idNumber;
        existing.documentUrl = documentUrl;
        existing.selfieUrl = selfieUrl;

        existing.status = "RESUBMITTED";
        existing.reviewedAt = null;
        existing.rejectionReason = null;

        await this._kycRepo.save(existing);
        await this._hubWorkerRepository.findOneAndUpdate(
            { _id: workerId },
            { kycStatus: "RESUBMITTED" }
        )

    }
}