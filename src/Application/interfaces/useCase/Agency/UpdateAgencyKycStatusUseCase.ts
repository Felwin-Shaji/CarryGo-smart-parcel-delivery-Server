import { Agency } from "../../../../Domain/Entities/Agency/Agency.js";

export interface IUpdateAgencyKycStatusUseCase  {
    execute(agencyId: string):Promise<Agency | null> 
}
