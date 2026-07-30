import { AdminBookingsReportResponseDTO } from "../../Application/Dto/Admin/adminDashboard.dto";
import { SalesReportResponseDTO } from "../../Application/Dto/Agency/agencyDashboard.dto";
import { IReportGenerator } from "../../Application/interfaces/services_Interfaces/Report/IReportService";

export type ExportType = "excel" | "pdf";

export type ReportGenerators = {
    excel: IReportGenerator<SalesReportResponseDTO>;
    pdf: IReportGenerator<SalesReportResponseDTO>;
};

export type AdminReportGenerators = {
    excel: IReportGenerator<AdminBookingsReportResponseDTO>;
    pdf: IReportGenerator<AdminBookingsReportResponseDTO>;
};