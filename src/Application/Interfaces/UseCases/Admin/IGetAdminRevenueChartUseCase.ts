import { AdminRevenueChartResponseDTO, GetAdminDashboardDTO } from "../../../DTOs/Admin/AdminDashboardDTO";

export interface IGetAdminRevenueChartUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminRevenueChartResponseDTO>;
}