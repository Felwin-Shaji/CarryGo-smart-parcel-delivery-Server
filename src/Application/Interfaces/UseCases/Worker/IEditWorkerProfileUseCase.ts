import { EditWorkerProfileRequestDto, WorkerProfileResponseDTO } from "../../../DTOs/Worker/WorkerProfileDTO";

export interface IEditWorkerProfileUseCase {
    execute(workerId: string, dto: EditWorkerProfileRequestDto): Promise<WorkerProfileResponseDTO>;
}