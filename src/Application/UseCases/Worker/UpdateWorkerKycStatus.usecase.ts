import { AppError } from "../../../Domain/Utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { UpdateWorkerKycStatusDTO } from "../../DTOs/Worker/worker.dto";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/hub.repository";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/worker.repository";
import { IHubWorkerKycRepository } from "../../Interfaces/Repositories/Worker/wrokerKyc.repository";
import { INotificationService } from "../../Interfaces/Services/Notification/INotificationService";
import { INotificationSocketService } from "../../Interfaces/Services/Notification/INotificationSocketService";
import { IUpdateWorkerKycStatusUseCase } from "../../Interfaces/UseCases/Worker/IUpdateWorkerKycStatusUseCase";
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