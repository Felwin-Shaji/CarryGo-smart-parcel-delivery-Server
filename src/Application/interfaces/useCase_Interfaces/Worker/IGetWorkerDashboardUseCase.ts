import { GetWorkerDashboardResponseDTO } from "@/Application/Dto/Workers/worker.dto";

export interface IGetWorkerDashboardUseCase {
    execute(workerId: string): Promise<GetWorkerDashboardResponseDTO>
}