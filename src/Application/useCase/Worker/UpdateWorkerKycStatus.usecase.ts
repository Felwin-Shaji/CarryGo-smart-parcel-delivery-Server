import { UpdateWorkerKycStatusDTO } from "@/Application/Dto/Workers/worker.dto";
import { IHubWorkerRepository } from "@/Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IHubWorkerKycRepository } from "@/Application/interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { IUpdateWorkerKycStatusUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IUpdateWorkerKycStatusUseCase";
import { AppError } from "@/Domain/utils/customError";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateWorkerKycStatusUseCase implements IUpdateWorkerKycStatusUseCase {
    constructor(
        @inject("IHubWorkerRepository") private _hubWorkerRepository: IHubWorkerRepository,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepository: IHubWorkerKycRepository,

    ) { }

    async execute(workerId: string, dto: UpdateWorkerKycStatusDTO): Promise<void> {
        const { status, rejectReason } = dto;

        const worker = await this._hubWorkerRepository.findById({ _id: workerId });

        if (!worker) throw new AppError(WORKER_MESSAGES.WORKERS_NOT_FOUND, STATUS.NOT_FOUND);
        if (worker.kycStatus === "APPROVED") throw new AppError(WORKER_MESSAGES.ALREADY_APPROVERD, STATUS.BAD_REQUEST);
        if (status === "REJECTED" && !rejectReason) throw new AppError(WORKER_MESSAGES.ALREADY_REJECTED, STATUS.BAD_REQUEST);

        const workerKyc = await this._hubWorkerKycRepository.getKycBySubjectId(workerId, "worker");
        if (!workerKyc) throw new AppError(WORKER_MESSAGES.KYC_NOT_FOUND, STATUS.NOT_FOUND);

        await this._hubWorkerRepository.findOneAndUpdate({ _id: workerId }, { kycStatus: status });
        await this._hubWorkerKycRepository.findOneAndUpdate(
            { subjectId: workerId, subjectType: "worker" },
            {status,rejectReason}
        )

    }
}