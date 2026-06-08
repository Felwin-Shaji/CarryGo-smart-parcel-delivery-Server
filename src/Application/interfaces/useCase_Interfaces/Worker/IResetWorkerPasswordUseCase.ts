import { WorkerResetPasswordRequestDTO } from "../../../Dto/Workers/workerProfile.dto";

export interface IResetWorkerPasswordUseCase {
    execute(workerId: string, dto: WorkerResetPasswordRequestDTO): Promise<void>;
}