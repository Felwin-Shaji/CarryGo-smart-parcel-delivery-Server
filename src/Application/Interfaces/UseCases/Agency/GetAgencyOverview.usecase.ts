import { GetAgencyOverviewResponseDTO } from "../../../DTOs/Agency/agency.dto";

export interface IGetAgencyOverviewUseCase {
    execute(agencyId: string): Promise<GetAgencyOverviewResponseDTO>;
}