import { GetWorkerDashboardResponseDTO } from "../../../DTOs/Worker/worker.dto";

export interface IGetWorkerDashboardUseCase {
    execute(workerId: string): Promise<GetWorkerDashboardResponseDTO>
}