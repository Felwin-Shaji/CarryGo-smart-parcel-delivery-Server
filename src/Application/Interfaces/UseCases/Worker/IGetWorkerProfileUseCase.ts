import { WorkerProfileResponseDTO } from "../../../DTOs/Worker/WorkerProfileDTO";

export interface IGetWorkerProfileUseCase {
    execute(workerId: string): Promise<WorkerProfileResponseDTO>;
}