import { AgencyDashboardResponseDTO } from "@/Application/Dto/Agency/agencyDashboard.dto";

export interface IAgencyGetDashboardUsecase {
    execute(agencyId: string): Promise<AgencyDashboardResponseDTO>;
}