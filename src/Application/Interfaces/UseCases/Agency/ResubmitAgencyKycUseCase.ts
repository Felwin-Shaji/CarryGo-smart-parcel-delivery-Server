import { AgencyResubmitKycDTO } from "../../../DTOs/Agency/agency.dto";

export interface IRsubmitAgencyKycUseCase {
    execute(dto: AgencyResubmitKycDTO): Promise<AgencyResubmitKycDTO>;
}