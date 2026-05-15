import { GetWorkerGraphRequestDTO, GetWorkerGraphResponseDTO } from "../../../Dto/Workers/worker.dto";

export interface IGetWorkerGraphUseCase {
    execute(
        workerId: string,
        filters: GetWorkerGraphRequestDTO
    ): Promise<GetWorkerGraphResponseDTO>;
}