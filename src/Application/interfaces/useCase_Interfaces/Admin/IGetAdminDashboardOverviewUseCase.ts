import { AdminDashboardResponseDTO, GetAdminDashboardDTO } from "../../../Dto/Admin/adminDashboard.dto";

export interface IGetAdminDashboardOverviewUseCase {
    execute(dto: GetAdminDashboardDTO): Promise<AdminDashboardResponseDTO>;
}