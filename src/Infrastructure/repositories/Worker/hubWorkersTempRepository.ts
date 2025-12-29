import { IHubWorkersTempRepository } from "../../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { HubWorkersTemp } from "../../../Domain/Entities/Worker/WrokersTemp";
import { HubWorkerTempModel } from "../../database/models/Worker/WorkerTempModel";
import { BaseRepository } from "../baseRepositories";

export class HubWorkersTempRepository extends BaseRepository<HubWorkersTemp> implements IHubWorkersTempRepository{
    constructor(){
        super(HubWorkerTempModel)
    }
}