import { AdminBookingsReportDTO, AdminBookingsReportResponseDTO } from "../../../DTOs/Admin/AdminDashboardDTO";

export interface IGetAdminBookingsReportUseCase {
    execute(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO>;
}