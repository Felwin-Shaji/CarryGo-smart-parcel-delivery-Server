import { AppError } from "../../../Domain/utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { UpdateWorkerKycStatusDTO } from "../../Dto/Workers/worker.dto";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IHubWorkerKycRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { INotificationService } from "../../interfaces/services_Interfaces/Notification/INotificationService";
import { INotificationSocketService } from "../../interfaces/services_Interfaces/Notification/INotificationSocketService";
import { IUpdateWorkerKycStatusUseCase } from "../../interfaces/useCase_Interfaces/Worker/IUpdateWorkerKycStatusUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateWorkerKycStatusUseCase implements IUpdateWorkerKycStatusUseCase {
    constructor(
        @inject("IHubWorkerRepository") private _hubWorkerRepository: IHubWorkerRepository,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepository: IHubWorkerKycRepository,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private _notificationSocketService: INotificationSocketService,
        @inject("IHubRepository") private _hubRepository: IHubRepository,

    ) { }

    async execute(workerId: string, dto: UpdateWorkerKycStatusDTO): Promise<void> {
        const { status, rejectReason } = dto;

        const worker = await this._hubWorkerRepository.findById({ _id: workerId });

        if (!worker || !worker.id) throw new AppError(WORKER_MESSAGES.WORKERS_NOT_FOUND, STATUS.NOT_FOUND);
        if (worker.kycStatus === "APPROVED") throw new AppError(WORKER_MESSAGES.ALREADY_APPROVERD, STATUS.BAD_REQUEST);
        if (status === "REJECTED" && !rejectReason) throw new AppError(WORKER_MESSAGES.ALREADY_REJECTED, STATUS.BAD_REQUEST);

        const workerKyc = await this._hubWorkerKycRepository.getKycBySubjectId(workerId, "worker");
        if (!workerKyc) throw new AppError(WORKER_MESSAGES.KYC_NOT_FOUND, STATUS.NOT_FOUND);

        await this._hubWorkerRepository.findOneAndUpdate({ _id: workerId }, { kycStatus: status });
        await this._hubWorkerKycRepository.findOneAndUpdate(
            { subjectId: workerId, subjectType: "worker" },
            { status, rejectReason }
        );

        await this._notifyWorker(
            worker.id.toString(),
            status,
            rejectReason
        );

        if (worker.hubId) {

            await this._notifyHub(
                worker.hubId.toString(),
                worker.name,
                status,
                rejectReason
            );
        };

    };

    private async _notifyWorker(
        workerId: string,
        status: string,
        rejectReason?: string
    ): Promise<void> {

        const message =
            status === "APPROVED"
                ? "Your KYC verification has been approved."
                : `Your KYC verification was rejected.${rejectReason
                    ? ` Reason: ${rejectReason}`
                    : ""
                }`;

        const notification =
            await this._notificationService.createNotification(
                workerId,
                "Worker KYC Status Updated",
                message
            );

        this._notificationSocketService.emitNotification(
            workerId,
            notification
        );
    };

    private async _notifyHub(
        hubId: string,
        workerName: string,
        status: string,
        rejectReason?: string
    ): Promise<void> {

        const message =
            status === "APPROVED"
                ? `Worker "${workerName}" KYC has been approved.`
                : `Worker "${workerName}" KYC was rejected.${rejectReason
                    ? ` Reason: ${rejectReason}`
                    : ""
                } Please assist with resubmission.`;

        const notification =
            await this._notificationService.createNotification(
                hubId,
                "Worker KYC Status Updated",
                message
            );

        this._notificationSocketService.emitNotification(
            hubId,
            notification
        );
    }
}