import { AdminBookingChartResponseDTO, AdminBookingsReportDTO, AdminBookingsReportResponseDTO, AdminDashboardResponseDTO, AdminRevenueChartResponseDTO, GetAdminDashboardDTO } from "../../../DTOs/Admin/adminDashboard.dto";

export interface IAdminDashboardRepository {
    getDashboardOverview(dto: GetAdminDashboardDTO): Promise<AdminDashboardResponseDTO>;
    getRevenueChart(dto: GetAdminDashboardDTO): Promise<AdminRevenueChartResponseDTO>;
    getBookingsChart(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO>;
    getBookingsReport(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO>;
}