import { SalesReportResponseDTO } from "../../../Dto/Agency/agencyDashboard.dto";

export interface IReportGenerator {
    generate(report: SalesReportResponseDTO): Promise<Buffer>;
}