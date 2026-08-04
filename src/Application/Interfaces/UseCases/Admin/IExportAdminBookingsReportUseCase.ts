import { ExportAdminBookingsReportDTO, ExportAdminBookingsReportResponseDTO, } from "../../../DTOs/Admin/adminDashboard.dto";

export interface IExportAdminBookingsReportUseCase {
    execute(dto: ExportAdminBookingsReportDTO): Promise<ExportAdminBookingsReportResponseDTO>;
}