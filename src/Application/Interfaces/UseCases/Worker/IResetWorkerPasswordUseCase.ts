import { WorkerResetPasswordRequestDTO } from "../../../DTOs/Worker/workerProfile.dto";

export interface IResetWorkerPasswordUseCase {
    execute(workerId: string, dto: WorkerResetPasswordRequestDTO): Promise<void>;
}