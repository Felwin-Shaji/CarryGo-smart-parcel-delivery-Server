import { AdminBookingChartResponseDTO, AdminBookingsReportDTO, AdminBookingsReportResponseDTO, AdminDashboardResponseDTO, AdminRevenueChartResponseDTO, GetAdminDashboardDTO } from "../../../Dto/Admin/adminDashboard.dto";

export interface IAdminDashboardRepository {
    getDashboardOverview(dto: GetAdminDashboardDTO): Promise<AdminDashboardResponseDTO>;
    getRevenueChart(dto: GetAdminDashboardDTO): Promise<AdminRevenueChartResponseDTO>;
    getBookingsChart(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO>;
    getBookingsReport(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO>;
}