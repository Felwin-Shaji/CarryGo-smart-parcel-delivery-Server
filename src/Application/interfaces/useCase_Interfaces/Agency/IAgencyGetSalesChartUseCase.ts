import { SalesChartRequestDTO, SalesChartResponseDTO } from "../../../Dto/Agency/agencyDashboard.dto";

export interface IAgencyGetSalesChartUseCase {
    execute(agencyId: string, query: SalesChartRequestDTO): Promise<SalesChartResponseDTO>;
} 