import { AdminBookingsReportDTO, AdminBookingsReportResponseDTO } from "../../../Dto/Admin/adminDashboard.dto";

export interface IGetAdminBookingsReportUseCase {
    execute(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO>;
}