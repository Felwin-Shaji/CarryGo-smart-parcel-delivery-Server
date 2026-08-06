import { AgencyDashboardResponseDTO } from "../../../DTOs/Agency/AgencyDashboardDTO";

export interface IAgencyGetDashboardUsecase {
    execute(agencyId: string): Promise<AgencyDashboardResponseDTO>;
}