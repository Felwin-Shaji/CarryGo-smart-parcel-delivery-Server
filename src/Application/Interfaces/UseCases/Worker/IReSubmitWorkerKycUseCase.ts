import { WorkerKYCFileFields } from "../../../../Infrastructure/Services/Storage/multer";
import { ReSubmitWorkerKycPayloadDTO } from "../../../DTOs/Worker/WorkerDTO";

export interface IReSubmitWorkerKycUseCase {
    execute(workerId: string, payload: ReSubmitWorkerKycPayloadDTO, files: WorkerKYCFileFields): Promise<void>;
}
