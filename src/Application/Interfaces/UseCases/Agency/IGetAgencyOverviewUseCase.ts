import { GetAgencyOverviewResponseDTO } from "../../../DTOs/Agency/AgencyDTO";

export interface IGetAgencyOverviewUseCase {
    execute(agencyId: string): Promise<GetAgencyOverviewResponseDTO>;
}