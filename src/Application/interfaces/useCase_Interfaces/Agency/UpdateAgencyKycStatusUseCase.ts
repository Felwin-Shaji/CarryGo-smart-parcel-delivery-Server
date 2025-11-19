import { Agency } from "../../../../Domain/Entities/Agency/Agency.js";
import { KYCStatus } from "../../../../Infrastructure/Types/types.js";

export interface IUpdateAgencyKycStatusUseCase  {
    execute(agencyId: string,status:KYCStatus):Promise<Agency | null> 
}
