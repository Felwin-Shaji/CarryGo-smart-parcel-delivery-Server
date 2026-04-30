import { GetWorkerParcelsDTO, GetWorkerParcelsResponseDTO } from "@/Application/Dto/Workers/worker.dto";

export interface IGetWorkerParcelsUseCase {
    execute(workerId: string, dto: GetWorkerParcelsDTO): Promise<GetWorkerParcelsResponseDTO>;
}