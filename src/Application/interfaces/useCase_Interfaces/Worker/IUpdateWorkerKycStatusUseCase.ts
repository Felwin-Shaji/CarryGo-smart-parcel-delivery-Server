import { UpdateWorkerKycStatusDTO } from "../../../Dto/Workers/worker.dto";

export interface IUpdateWorkerKycStatusUseCase {
    execute(workerId: string, dto: UpdateWorkerKycStatusDTO): Promise<void>;
}