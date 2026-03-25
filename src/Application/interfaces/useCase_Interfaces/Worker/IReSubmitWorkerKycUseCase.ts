import { ReSubmitWorkerKycPayloadDTO } from "@/Application/Dto/Workers/worker.dto";
import { WorkerKYCFileFields } from "@/Infrastructure/services/storage/multer";

export interface IReSubmitWorkerKycUseCase {
    execute(workerId: string, payload: ReSubmitWorkerKycPayloadDTO, files: WorkerKYCFileFields): Promise<void>;
}
