import { SalesReportResponseDTO } from "@/Application/Dto/Agency/agencyDashboard.dto";

export interface IReportGenerator {
    generate(report: SalesReportResponseDTO): Promise<Buffer>;
}