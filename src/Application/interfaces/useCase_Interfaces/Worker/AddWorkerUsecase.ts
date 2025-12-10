import { IDType } from "../../../../Domain/Entities/Worker/WorkerKyc";
import { WorkerResponseDTO } from "../../../Dto/Workers/worker.dto";

export interface IAddWorkerUsecase {
    execute(email: string, idType: IDType, files: any): Promise<WorkerResponseDTO>;
}