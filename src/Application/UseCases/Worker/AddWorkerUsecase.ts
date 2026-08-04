import { inject, injectable } from "tsyringe";
import { IHubWorkersTempRepository } from "../../Interfaces/Repositories/Worker/worersTemp.repository";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/worker.repository";
import { IMailService } from "../../Interfaces/Services/email-service.interface";
import { IPasswordService } from "../../Interfaces/Services/password-service.interface";
import { AppError } from "../../../Domain/Utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { WorkerMapper } from "../../Mappers/Worker/WorkerMapper";
import { WorkerResponseDTO } from "../../DTOs/Worker/worker.dto";
import { IAddWorkerUsecase } from "../../Interfaces/UseCases/Worker/AddWorkerUsecase";
import { IHubWorkerKycRepository } from "../../Interfaces/Repositories/Worker/wrokerKyc.repository";
import { IDType } from "../../../Domain/Entities/Worker/WorkerKyc";
import { UploadedWorkerKycFiles } from "../../Interfaces/UseCases/Worker/uploadWorkerKycFilesUsecase";
import { INotificationSocketService } from "../../Interfaces/Services/Notification/INotificationSocketService";
import { INotificationService } from "../../Interfaces/Services/Notification/INotificationService";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/agency.repository";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/hub.repository";

@injectable()
export class AddWorkerUsecase implements IAddWorkerUsecase {
    constructor(
        @inject("IHubWorkersTempRepository") private _hubWorkersTempRepo: IHubWorkersTempRepository,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepo: IHubWorkerKycRepository,
        @inject("IHubWorkerRepository") private _hubWorkerRepo: IHubWorkerRepository,
        @inject("IPasswordService") private _passwordService: IPasswordService,
        @inject("IMailService") private _mailer: IMailService,

        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private _notificationSocketService: INotificationSocketService,
    ) { }
    async execute(email: string, idType: IDType, idNumber: string, hubId: string, files: UploadedWorkerKycFiles): Promise<WorkerResponseDTO> {

        const tempWorker = await this._hubWorkersTempRepo.findOne({ email });
        if (!tempWorker || tempWorker.status !== "OTP-Verified") throw new AppError(WORKER_MESSAGES.SESSION_NOT_FOUND, STATUS.NOT_FOUND);

        if (!files.document || !files.selfie) throw new AppError(WORKER_MESSAGES.KYC_FILES_REQUIRED, STATUS.BAD_REQUEST);

        const documentUrl = files.document as string
        const selfieUrl = files.selfie as string

        const rawPassword = this._passwordService.generateCustomPassword(tempWorker.email, tempWorker.mobile);
        const hashedPassword = await this._passwordService.hashPassword(rawPassword);

        const workerEntity = WorkerMapper.toCreateWorker(
            tempWorker,
            hashedPassword,
            hubId
        );

        const savedWorker = await this._hubWorkerRepo.save(workerEntity);
        await this._hubWorkersTempRepo.delete({ email });

        const kycEntity = WorkerMapper.toWorkerKycEntity(
            savedWorker.id!,
            idType,
            documentUrl,
            selfieUrl,
            idNumber,
            "worker"
        );

        await this._hubWorkerKycRepo.save(kycEntity);
        await this._notifyAgency(hubId, savedWorker.name);
        console.log("DEV Worker Password:", rawPassword);

        await this._mailer.sendCustomPassword(tempWorker.email);

        return WorkerMapper.toAddWorkerResponseDTO(savedWorker);
    };

    private async _notifyAgency(hubId: string, workerName: string): Promise<void> {

        const hub = await this._hubRepo.findById({
            _id: hubId
        });

        if (!hub?.agencyId) return;

        const agency = await this._agencyRepo.findById({
            _id: hub.agencyId.toString()
        });

        if (!agency?.id) return;

        const notification =
            await this._notificationService.createNotification(
                agency.id.toString(),
                "New Worker Added",
                `A new worker "${workerName}" was added to hub "${hub.name}" and is awaiting management review.`
            );

        this._notificationSocketService.emitNotification(
            agency.id.toString(),
            notification
        );
    }
}