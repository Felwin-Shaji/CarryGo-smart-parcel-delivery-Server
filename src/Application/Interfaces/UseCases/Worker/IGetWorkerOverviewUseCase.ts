import { GetWorkerOverviewResponseDTO } from "../../../DTOs/Worker/WorkerDTO";

export interface IGetWorkerOverviewUseCase {
  execute(workerId: string): Promise<GetWorkerOverviewResponseDTO>;
}