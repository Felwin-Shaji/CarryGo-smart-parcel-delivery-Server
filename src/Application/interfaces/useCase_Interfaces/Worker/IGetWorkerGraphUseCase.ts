import { GetWorkerGraphRequestDTO, GetWorkerGraphResponseDTO } from "@/Application/Dto/Workers/worker.dto";

export interface IGetWorkerGraphUseCase {
    execute(
        workerId: string,
        filters: GetWorkerGraphRequestDTO
    ): Promise<GetWorkerGraphResponseDTO>;
}