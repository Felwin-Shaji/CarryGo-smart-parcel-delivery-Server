import { GetWorkerGraphRequestDTO, GetWorkerGraphResponseDTO } from "../../../DTOs/Worker/worker.dto";

export interface IGetWorkerGraphUseCase {
    execute(
        workerId: string,
        filters: GetWorkerGraphRequestDTO
    ): Promise<GetWorkerGraphResponseDTO>;
}