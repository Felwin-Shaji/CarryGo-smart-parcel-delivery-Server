import { GetWorkerParcelsDTO, GetWorkerParcelsResponseDTO } from "../../../DTOs/Worker/WorkerDTO";

export interface IGetWorkerParcelsUseCase {
    execute(workerId: string, dto: GetWorkerParcelsDTO): Promise<GetWorkerParcelsResponseDTO>;
}