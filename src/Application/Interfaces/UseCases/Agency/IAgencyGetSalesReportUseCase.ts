import { SalesReportRequestDTO, SalesReportResponseDTO } from "../../../DTOs/Agency/AgencyDashboardDTO";

export interface IAgencyGetSalesReportUseCase {
    execute(agencyId: string, query: SalesReportRequestDTO): Promise<SalesReportResponseDTO>;
}