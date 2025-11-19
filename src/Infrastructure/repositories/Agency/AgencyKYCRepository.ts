import { injectable } from "tsyringe";
import { IAgencyKYCRepository } from "../../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/AgencyKYC";
import { BaseRepository } from "../baseRepositories";
import { AgencyKYC } from "../../../Domain/Entities/Agency/AgencyKYC";
import { AgencyKYCModel } from "../../database/models/AgencyModels/AgencyKYCModel";


@injectable()
export class AgencyKYCRepository extends BaseRepository<AgencyKYC> implements IAgencyKYCRepository {

    async saveKYC(agencyId: string, data: Partial<AgencyKYC>) {
        return AgencyKYCModel.findOneAndUpdate(
            { agencyId },
            { ...data },
            { upsert: true, new: true }
        );
    }
}
