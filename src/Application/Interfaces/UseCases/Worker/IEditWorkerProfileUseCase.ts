import { EditWorkerProfileRequestDto, WorkerProfileResponseDTO } from "../../../DTOs/Worker/workerProfile.dto";

export interface IEditWorkerProfileUseCase {
    execute(workerId: string, dto: EditWorkerProfileRequestDto): Promise<WorkerProfileResponseDTO>;
}