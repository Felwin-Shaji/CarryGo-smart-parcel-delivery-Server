import type { IAgencyRepository } from "../../Application/interfaces/repositories/agency/agency.repository.js";
import type { Agency } from "../../Domain/Entities/Agency.js";
import { AgencyModel } from "../database/models/AgencyModels/agencyModel.js";
import { BaseRepository } from "./baseRepositories.js";

export class AgencyRepository extends BaseRepository<Agency> implements IAgencyRepository{
    constructor(){
        super(AgencyModel);
    };
};