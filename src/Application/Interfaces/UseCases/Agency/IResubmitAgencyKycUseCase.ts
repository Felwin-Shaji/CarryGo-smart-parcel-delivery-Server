import { AgencyResubmitKycDTO } from "../../../DTOs/Agency/AgencyDTO";

export interface IRsubmitAgencyKycUseCase {
    execute(dto: AgencyResubmitKycDTO): Promise<AgencyResubmitKycDTO>;
}