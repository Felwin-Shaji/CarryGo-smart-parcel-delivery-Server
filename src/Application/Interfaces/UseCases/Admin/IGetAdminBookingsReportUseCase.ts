import { AdminBookingsReportDTO, AdminBookingsReportResponseDTO } from "../../../DTOs/Admin/adminDashboard.dto";

export interface IGetAdminBookingsReportUseCase {
    execute(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO>;
}