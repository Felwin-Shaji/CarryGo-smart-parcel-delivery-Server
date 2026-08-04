import { GetWorkerParcelsDTO, GetWorkerParcelsResponseDTO } from "../../../DTOs/Worker/worker.dto";

export interface IGetWorkerParcelsUseCase {
    execute(workerId: string, dto: GetWorkerParcelsDTO): Promise<GetWorkerParcelsResponseDTO>;
}