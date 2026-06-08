import { WorkerProfileResponseDTO } from "../../../Dto/Workers/workerProfile.dto";

export interface IGetWorkerProfileUseCase {
    execute(workerId: string): Promise<WorkerProfileResponseDTO>;
}