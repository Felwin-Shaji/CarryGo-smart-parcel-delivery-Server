import { KYCStatus } from "../../../../Infrastructure/Types/types.js";
import { updateAgencyKycStatusDTO } from "../../../DTOs/Agency/AgencyDTO.js";

export interface IUpdateAgencyKycStatusUseCase  {
    execute(agencyId: string,dto:updateAgencyKycStatusDTO):Promise<KYCStatus>;
}
