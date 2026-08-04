import { AdminDashboardResponseDTO, GetAdminDashboardDTO } from "../../../DTOs/Admin/adminDashboard.dto";

export interface IGetAdminDashboardOverviewUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminDashboardResponseDTO>;
}