import { WorkerKYCFileFields } from "../../../../Infrastructure/services/storage/multer";
import { ReSubmitWorkerKycPayloadDTO } from "../../../Dto/Workers/worker.dto";

export interface IReSubmitWorkerKycUseCase {
    execute(workerId: string, payload: ReSubmitWorkerKycPayloadDTO, files: WorkerKYCFileFields): Promise<void>;
}
