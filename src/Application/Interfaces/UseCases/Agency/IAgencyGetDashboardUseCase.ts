import { AgencyDashboardResponseDTO } from "../../../DTOs/Agency/agencyDashboard.dto";

export interface IAgencyGetDashboardUsecase {
    execute(agencyId: string): Promise<AgencyDashboardResponseDTO>;
}