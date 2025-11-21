import { IHubRepository } from "../../../Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { Hub } from "../../../Domain/Entities/Hub/Hub";
import { HubModel } from "../../database/models/Hub/HubModel";
import { BaseRepository } from "../baseRepositories";

export class HubRepository extends BaseRepository<Hub> implements IHubRepository{
    constructor(){
        super(HubModel)
    }
}