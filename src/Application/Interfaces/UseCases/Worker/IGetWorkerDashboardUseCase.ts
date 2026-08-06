import { GetWorkerDashboardResponseDTO } from "../../../DTOs/Worker/WorkerDTO";

export interface IGetWorkerDashboardUseCase {
    execute(workerId: string): Promise<GetWorkerDashboardResponseDTO>
}