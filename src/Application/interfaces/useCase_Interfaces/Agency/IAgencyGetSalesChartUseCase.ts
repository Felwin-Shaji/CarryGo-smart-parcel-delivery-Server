import { SalesChartRequestDTO, SalesChartResponseDTO } from "@/Application/Dto/Agency/agencyDashboard.dto";

export interface IAgencyGetSalesChartUseCase {
    execute(agencyId: string, query: SalesChartRequestDTO): Promise<SalesChartResponseDTO>;
} 