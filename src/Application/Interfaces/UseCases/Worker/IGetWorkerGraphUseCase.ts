import { GetWorkerGraphRequestDTO, GetWorkerGraphResponseDTO } from "../../../DTOs/Worker/WorkerDTO";

export interface IGetWorkerGraphUseCase {
    execute(
        workerId: string,
        filters: GetWorkerGraphRequestDTO
    ): Promise<GetWorkerGraphResponseDTO>;
}