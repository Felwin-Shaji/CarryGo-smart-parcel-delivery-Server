import { ExportAdminBookingsReportDTO, ExportAdminBookingsReportResponseDTO, } from "../../../DTOs/Admin/AdminDashboardDTO";

export interface IExportAdminBookingsReportUseCase {
    execute(dto: ExportAdminBookingsReportDTO): Promise<ExportAdminBookingsReportResponseDTO>;
}