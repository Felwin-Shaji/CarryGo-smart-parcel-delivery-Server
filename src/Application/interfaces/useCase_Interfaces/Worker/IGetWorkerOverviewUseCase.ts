import { GetWorkerOverviewResponseDTO } from "@/Application/Dto/Workers/worker.dto";

export interface IGetWorkerOverviewUseCase {
  execute(workerId: string): Promise<GetWorkerOverviewResponseDTO>;
}