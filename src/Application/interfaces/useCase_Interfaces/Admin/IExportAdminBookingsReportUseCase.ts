import { ExportAdminBookingsReportDTO, ExportAdminBookingsReportResponseDTO, } from "../../../Dto/Admin/adminDashboard.dto";

export interface IExportAdminBookingsReportUseCase {
    execute(dto: ExportAdminBookingsReportDTO): Promise<ExportAdminBookingsReportResponseDTO>;
}