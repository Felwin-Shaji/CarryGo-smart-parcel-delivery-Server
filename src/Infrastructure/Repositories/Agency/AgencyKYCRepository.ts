import { injectable } from "tsyringe";
import { IAgencyKYCRepository } from "../../../Application/Interfaces/Repositories/Agency/AgencyKYC";
import { BaseRepository } from "../baseRepositories";
import { AgencyKYC } from "../../../Domain/Entities/Agency/AgencyKYC";
import { AgencyKYCModel } from "../../Database/Models/Agency/AgencyKYCModel";


@injectable()
export class AgencyKYCRepository extends BaseRepository<AgencyKYC> implements IAgencyKYCRepository {

    constructor() {
        super(AgencyKYCModel);
    }

    async saveKYC(agencyId: string, data: Partial<AgencyKYC>) {
        return AgencyKYCModel.findOneAndUpdate(
            { agencyId },
            { ...data },
            { upsert: true, new: true }
        );
    }
}
