import { AgencyResubmitKycDTO } from "../../../Dto/Agency/agency.dto";

export interface IRsubmitAgencyKycUseCase {
    execute(dto: AgencyResubmitKycDTO): Promise<AgencyResubmitKycDTO>;
}