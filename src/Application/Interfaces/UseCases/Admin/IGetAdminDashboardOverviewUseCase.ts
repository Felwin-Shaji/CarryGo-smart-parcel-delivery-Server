import { AdminDashboardResponseDTO, GetAdminDashboardDTO } from "../../../DTOs/Admin/AdminDashboardDTO";

export interface IGetAdminDashboardOverviewUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminDashboardResponseDTO>;
}