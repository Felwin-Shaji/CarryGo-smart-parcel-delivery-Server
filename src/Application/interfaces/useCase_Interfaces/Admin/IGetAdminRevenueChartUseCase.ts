import { AdminRevenueChartResponseDTO, GetAdminDashboardDTO } from "../../../Dto/Admin/adminDashboard.dto";

export interface IGetAdminRevenueChartUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminRevenueChartResponseDTO>;
}