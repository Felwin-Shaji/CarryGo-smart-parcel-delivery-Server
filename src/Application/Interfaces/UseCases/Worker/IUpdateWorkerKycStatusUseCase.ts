import { UpdateWorkerKycStatusDTO } from "../../../DTOs/Worker/worker.dto";

export interface IUpdateWorkerKycStatusUseCase {
    execute(workerId: string, dto: UpdateWorkerKycStatusDTO): Promise<void>;
}