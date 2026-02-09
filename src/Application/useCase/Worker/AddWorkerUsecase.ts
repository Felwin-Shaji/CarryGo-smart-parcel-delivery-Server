import { inject, injectable } from "tsyringe";
import { IHubWorkersTempRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { WorkerMapper } from "../../Mappers/Workers/WorkerMapper";
import { ENV } from "../../../Infrastructure/constants/env";
import { WorkerResponseDTO } from "../../Dto/Workers/worker.dto";
import { IAddWorkerUsecase } from "../../interfaces/useCase_Interfaces/Worker/AddWorkerUsecase";
import { IHubWorkerKycRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { IDType } from "../../../Domain/Entities/Worker/WorkerKyc";
import { UploadedWorkerKycFiles } from "../../interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";

@injectable()
export class AddWorkerUsecase implements IAddWorkerUsecase {
    constructor(
        @inject("IHubWorkersTempRepository") private _hubWorkersTempRepo: IHubWorkersTempRepository,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepo: IHubWorkerKycRepository,
        @inject("IHubWorkerRepository") private _hubWorkerRepo: IHubWorkerRepository,
        @inject("IPasswordService") private _passwordService: IPasswordService,
        @inject("IMailService") private _mailer: IMailService
    ) { }
    async execute(email: string, idType: IDType,idNumber: string,hubId:string, files: UploadedWorkerKycFiles): Promise<WorkerResponseDTO> {

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

        if (ENV.IS_PROD) {
            await this._mailer.sendCustomPassword(tempWorker.email);
        }

        return WorkerMapper.toAddWorkerResponseDTO(savedWorker);

    }
}