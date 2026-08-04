import { GetWorkerKycResponseDTO } from "../../../DTOs/Worker/worker.dto";

export interface IGetWorkerKycUseCase {
  execute(workerId: string): Promise<GetWorkerKycResponseDTO | null>;
}
