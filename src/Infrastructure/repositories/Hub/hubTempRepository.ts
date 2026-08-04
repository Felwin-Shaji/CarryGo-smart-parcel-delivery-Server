import { IHubTempRepository } from "../../../Application/Interfaces/Repositories/Hub/hubTemp.repository";
import { HubTemp } from "../../../Domain/Entities/Hub/HubTemp";
import { HubTempModel } from "../../database/models/Hub/HubTempModel";
import { BaseRepository } from "../baseRepositories";

export class HubTempRepository extends BaseRepository<HubTemp> implements IHubTempRepository {
    constructor() {
        super(HubTempModel)
    }
}