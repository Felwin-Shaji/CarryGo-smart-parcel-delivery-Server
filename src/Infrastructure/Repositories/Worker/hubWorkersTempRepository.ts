import { IHubWorkersTempRepository } from "../../../Application/Interfaces/Repositories/Worker/IHubWorkersTempRepository";
import { HubWorkersTemp } from "../../../Domain/Entities/Worker/HubWorkersTemp";
import { HubWorkerTempModel } from "../../Database/Models/Worker/WorkerTempModel";
import { BaseRepository } from "../BaseRepository";

export class HubWorkersTempRepository extends BaseRepository<HubWorkersTemp> implements IHubWorkersTempRepository{
    constructor(){
        super(HubWorkerTempModel)
    }
}