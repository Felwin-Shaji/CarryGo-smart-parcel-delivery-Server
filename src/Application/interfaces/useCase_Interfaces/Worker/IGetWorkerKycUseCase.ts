import { GetWorkerKycResponseDTO } from "@/Application/Dto/Workers/worker.dto";

export interface IGetWorkerKycUseCase {
  execute(workerId: string): Promise<GetWorkerKycResponseDTO | null>;
}
