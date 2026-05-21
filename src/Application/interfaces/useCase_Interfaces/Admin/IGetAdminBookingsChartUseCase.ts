import { GetAdminDashboardDTO, AdminBookingChartResponseDTO } from "../../../Dto/Admin/adminDashboard.dto";

export interface IGetAdminBookingsChartUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO>;
}