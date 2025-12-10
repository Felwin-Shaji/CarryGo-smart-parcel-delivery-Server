import { Agency } from "../../../../Domain/Entities/Agency/Agency.js";
import { KYCStatus } from "../../../../Infrastructure/Types/types.js";
import { updateAgencyKycStatusDTO } from "../../../Dto/Agency/agency.dto.js";

export interface IUpdateAgencyKycStatusUseCase  {
    execute(agencyId: string,dto:updateAgencyKycStatusDTO):Promise<KYCStatus>;
}
