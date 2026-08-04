import { IHubWorkersTempRepository } from "../../../Application/Interfaces/Repositories/Worker/worersTemp.repository";
import { HubWorkersTemp } from "../../../Domain/Entities/Worker/HubWorkersTemp";
import { HubWorkerTempModel } from "../../Database/Models/Worker/WorkerTempModel";
import { BaseRepository } from "../baseRepositories";

export class HubWorkersTempRepository extends BaseRepository<HubWorkersTemp> implements IHubWorkersTempRepository{
    constructor(){
        super(HubWorkerTempModel)
    }
}