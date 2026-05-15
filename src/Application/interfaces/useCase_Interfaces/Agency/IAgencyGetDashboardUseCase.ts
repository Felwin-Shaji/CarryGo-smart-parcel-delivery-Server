import { AgencyDashboardResponseDTO } from "../../../Dto/Agency/agencyDashboard.dto";

export interface IAgencyGetDashboardUsecase {
    execute(agencyId: string): Promise<AgencyDashboardResponseDTO>;
}