import { AdminBookingsReportResponseDTO } from "../../Application/DTOs/Admin/AdminDashboardDTO";
import { SalesReportResponseDTO } from "../../Application/DTOs/Agency/AgencyDashboardDTO";
import { IReportGenerator } from "../../Application/Interfaces/Services/Report/IReportService";

export type ExportType = "excel" | "pdf";

export type ReportGenerators = {
    excel: IReportGenerator<SalesReportResponseDTO>;
    pdf: IReportGenerator<SalesReportResponseDTO>;
};

export type AdminReportGenerators = {
    excel: IReportGenerator<AdminBookingsReportResponseDTO>;
    pdf: IReportGenerator<AdminBookingsReportResponseDTO>;
};