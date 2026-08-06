import { GetAdminDashboardDTO, AdminBookingChartResponseDTO } from "../../../DTOs/Admin/AdminDashboardDTO";

export interface IGetAdminBookingsChartUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO>;
}