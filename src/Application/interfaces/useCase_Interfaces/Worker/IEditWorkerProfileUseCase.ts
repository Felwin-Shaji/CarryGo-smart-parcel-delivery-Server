import { EditWorkerProfileRequestDto, WorkerProfileResponseDTO } from "../../../Dto/Workers/workerProfile.dto";

export interface IEditWorkerProfileUseCase {
    execute(workerId: string, dto: EditWorkerProfileRequestDto): Promise<WorkerProfileResponseDTO>;
}