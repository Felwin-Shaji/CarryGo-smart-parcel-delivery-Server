import { WorkerResetPasswordRequestDTO } from "../../../DTOs/Worker/WorkerProfileDTO";

export interface IResetWorkerPasswordUseCase {
    execute(workerId: string, dto: WorkerResetPasswordRequestDTO): Promise<void>;
}