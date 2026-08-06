import { GetWorkerKycResponseDTO } from "../../../DTOs/Worker/WorkerDTO";

export interface IGetWorkerKycUseCase {
  execute(workerId: string): Promise<GetWorkerKycResponseDTO | null>;
}
