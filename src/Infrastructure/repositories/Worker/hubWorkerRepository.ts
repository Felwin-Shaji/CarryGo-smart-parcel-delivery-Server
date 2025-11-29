import { IHubWorkerRepository } from "../../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { HubWorker } from "../../../Domain/Entities/Worker/Worker";
import { HubWorkerModel } from "../../database/models/Worker/workerModel";
import { BaseRepository } from "../baseRepositories";

export class HubWorkerRepository extends BaseRepository<HubWorker> implements IHubWorkerRepository{
    constructor(){
        super(HubWorkerModel)
    }
}