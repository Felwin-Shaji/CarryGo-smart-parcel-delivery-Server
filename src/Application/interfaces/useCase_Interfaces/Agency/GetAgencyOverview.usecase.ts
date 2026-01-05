import { GetAgencyOverviewResponseDTO } from "../../../Dto/Agency/agency.dto";

export interface IGetAgencyOverviewUseCase {
    execute(agencyId: string): Promise<GetAgencyOverviewResponseDTO>;
}