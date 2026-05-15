import { inject, injectable } from "tsyringe";
import { IHubWorkerKycRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { AppError } from "../../../Domain/utils/customError";
import { IUploadWorkerKycFilesUsecase } from "../../interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { IReSubmitWorkerKycUseCase } from "../../interfaces/useCase_Interfaces/Worker/IReSubmitWorkerKycUseCase";
import { ReSubmitWorkerKycPayloadDTO } from "../../Dto/Workers/worker.dto";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { INotificationSocketService } from "../../interfaces/services_Interfaces/Notification/INotificationSocketService";
import { INotificationService } from "../../interfaces/services_Interfaces/Notification/INotificationService";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { WorkerKYCFileFields } from "../../../Infrastructure/services/storage/multer";

@injectable()
export class ReSubmitWorkerKycUseCase implements IReSubmitWorkerKycUseCase {
    constructor(
        @inject("IHubWorkerKycRepository") private _kycRepo: IHubWorkerKycRepository,
        @inject("IHubWorkerRepository") private _hubWorkerRepository: IHubWorkerRepository,
        @inject("IUploadWorkerKycFilesUsecase") private _uploadWorkerKycFilesUsecase: IUploadWorkerKycFilesUsecase,

        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private _notificationSocketService: INotificationSocketService,
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
            { kycStatus: "RESUBMITTED" });

        await this._notifyAgency(workerId);

    };

    private async _notifyAgency(workerId: string): Promise<void> {

        const worker =
            await this._hubWorkerRepository.findById({
                _id: workerId
            });

        if (!worker?.hubId) return;

        const hub = await this._hubRepo.findById({
            _id: worker.hubId.toString()
        });

        if (!hub?.agencyId) return;

        const agency = await this._agencyRepo.findById({
            _id: hub.agencyId.toString()
        });

        if (!agency?.id) return;

        const notification =
            await this._notificationService.createNotification(
                agency.id.toString(),
                "Worker KYC Resubmitted",
                `Worker "${worker.name}" has resubmitted KYC documents for review.`
            );

        this._notificationSocketService.emitNotification(
            agency.id.toString(),
            notification
        );
    }
}