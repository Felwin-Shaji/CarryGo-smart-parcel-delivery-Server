// import type { IAgencyKYC } from "../../../../Domain/Entities/AgencyKYC.js";

import { AgencyKYC } from "../../../../Domain/Entities/Agency/AgencyKYC";
import { IBaseRepository } from "../base.repository";



export interface IAgencyKYCRepository extends IBaseRepository<AgencyKYC> {
    saveKYC(agencyId: string, data: any): Promise<AgencyKYC>;
}
 