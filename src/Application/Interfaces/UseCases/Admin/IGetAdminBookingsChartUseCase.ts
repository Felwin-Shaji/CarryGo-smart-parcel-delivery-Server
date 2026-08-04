import { GetAdminDashboardDTO, AdminBookingChartResponseDTO } from "../../../DTOs/Admin/adminDashboard.dto";

export interface IGetAdminBookingsChartUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO>;
}