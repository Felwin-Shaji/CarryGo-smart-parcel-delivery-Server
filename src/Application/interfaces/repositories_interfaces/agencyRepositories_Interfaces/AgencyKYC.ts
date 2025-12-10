import { AgencyKYC } from "../../../../Domain/Entities/Agency/AgencyKYC";
import { IBaseRepository } from "../base.repository";



export interface IAgencyKYCRepository extends IBaseRepository<AgencyKYC> {
    saveKYC(agencyId: string, data: AgencyKYC): Promise<AgencyKYC>;
}
 