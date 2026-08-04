import { SalesChartRequestDTO, SalesChartResponseDTO } from "../../../DTOs/Agency/AgencyDashboardDTO";

export interface IAgencyGetSalesChartUseCase {
    execute(agencyId: string, query: SalesChartRequestDTO): Promise<SalesChartResponseDTO>;
} 