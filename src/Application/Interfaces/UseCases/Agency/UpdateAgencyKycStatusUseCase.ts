import { KYCStatus } from "../../../../Infrastructure/Types/types.js";
import { updateAgencyKycStatusDTO } from "../../../DTOs/Agency/agency.dto.js";

export interface IUpdateAgencyKycStatusUseCase  {
    execute(agencyId: string,dto:updateAgencyKycStatusDTO):Promise<KYCStatus>;
}
