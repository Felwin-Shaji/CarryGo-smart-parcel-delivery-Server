import { AdminBookingChartResponseDTO, AdminBookingsReportDTO, AdminBookingsReportResponseDTO, AdminDashboardResponseDTO, AdminRevenueChartResponseDTO, GetAdminDashboardDTO } from "../../../DTOs/Admin/AdminDashboardDTO";

export interface IAdminDashboardRepository {
    getDashboardOverview(dto: GetAdminDashboardDTO): Promise<AdminDashboardResponseDTO>;
    getRevenueChart(dto: GetAdminDashboardDTO): Promise<AdminRevenueChartResponseDTO>;
    getBookingsChart(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO>;
    getBookingsReport(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO>;
}