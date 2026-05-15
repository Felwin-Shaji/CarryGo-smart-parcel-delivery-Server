import { SalesReportRequestDTO, SalesReportResponseDTO } from "../../../Dto/Agency/agencyDashboard.dto";

export interface IAgencyGetSalesReportUseCase {
    execute(agencyId: string, query: SalesReportRequestDTO): Promise<SalesReportResponseDTO>;
}