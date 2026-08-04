import { SalesChartRequestDTO, SalesChartResponseDTO } from "../../../DTOs/Agency/agencyDashboard.dto";

export interface IAgencyGetSalesChartUseCase {
    execute(agencyId: string, query: SalesChartRequestDTO): Promise<SalesChartResponseDTO>;
} 