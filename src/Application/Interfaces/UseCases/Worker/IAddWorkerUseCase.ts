import { IDType } from "../../../../Domain/Entities/Worker/WorkerKYC";
import { WorkerResponseDTO } from "../../../DTOs/Worker/WorkerDTO";
import { UploadedWorkerKycFiles } from "./IUploadWorkerKycFilesUseCase";

export interface IAddWorkerUsecase {
    execute(email: string, idType: IDType,idNumber: string,hubId:string, files: UploadedWorkerKycFiles): Promise<WorkerResponseDTO>;
}