import { SalesReportRequestDTO, SalesReportResponseDTO } from "../../../DTOs/Agency/agencyDashboard.dto";

export interface IAgencyGetSalesReportUseCase {
    execute(agencyId: string, query: SalesReportRequestDTO): Promise<SalesReportResponseDTO>;
}