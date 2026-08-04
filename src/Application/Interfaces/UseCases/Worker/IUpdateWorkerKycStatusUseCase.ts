import { UpdateWorkerKycStatusDTO } from "../../../DTOs/Worker/WorkerDTO";

export interface IUpdateWorkerKycStatusUseCase {
    execute(workerId: string, dto: UpdateWorkerKycStatusDTO): Promise<void>;
}