import { AdminRevenueChartResponseDTO, GetAdminDashboardDTO } from "../../../DTOs/Admin/adminDashboard.dto";

export interface IGetAdminRevenueChartUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminRevenueChartResponseDTO>;
}