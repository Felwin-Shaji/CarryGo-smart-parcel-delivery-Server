import { GetWorkerOverviewResponseDTO } from "../../../DTOs/Worker/worker.dto";

export interface IGetWorkerOverviewUseCase {
  execute(workerId: string): Promise<GetWorkerOverviewResponseDTO>;
}