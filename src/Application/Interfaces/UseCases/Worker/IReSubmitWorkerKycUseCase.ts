import { WorkerKYCFileFields } from "../../../../Infrastructure/services/storage/multer";
import { ReSubmitWorkerKycPayloadDTO } from "../../../DTOs/Worker/worker.dto";

export interface IReSubmitWorkerKycUseCase {
    execute(workerId: string, payload: ReSubmitWorkerKycPayloadDTO, files: WorkerKYCFileFields): Promise<void>;
}
