import { HubWorker } from "../../../../Domain/Entities/Worker/Worker";
import { GetHubWorkersResponseDTO, GetWorkersDTO } from "../../../Dto/Workers/worker.dto";
import { IBaseRepository } from "../base.repository";


export interface IHubWorkerRepository extends IBaseRepository<HubWorker> {
    getPaginatedWorkersByHubs(hubId: string, dto: GetWorkersDTO): Promise<GetHubWorkersResponseDTO>;
}