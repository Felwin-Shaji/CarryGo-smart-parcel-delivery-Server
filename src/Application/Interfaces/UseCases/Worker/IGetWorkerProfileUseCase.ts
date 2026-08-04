import { WorkerProfileResponseDTO } from "../../../DTOs/Worker/workerProfile.dto";

export interface IGetWorkerProfileUseCase {
    execute(workerId: string): Promise<WorkerProfileResponseDTO>;
}