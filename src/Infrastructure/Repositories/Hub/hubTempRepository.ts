import { IHubTempRepository } from "../../../Application/Interfaces/Repositories/Hub/IHubTempRepository";
import { HubTemp } from "../../../Domain/Entities/Hub/HubTemp";
import { HubTempModel } from "../../Database/Models/Hub/HubTempModel";
import { BaseRepository } from "../baseRepositories";

export class HubTempRepository extends BaseRepository<HubTemp> implements IHubTempRepository {
    constructor() {
        super(HubTempModel)
    }
}