import { injectable } from "tsyringe";
import ExcelJS from "exceljs";
import { AdminBookingsReportResponseDTO } from "../../../../Application/Dto/Admin/adminDashboard.dto";
import { IReportGenerator } from "../../../../Application/interfaces/services_Interfaces/Report/IReportService";

@injectable()
export class AdminExcelBookingsReportGenerator implements IReportGenerator<AdminBookingsReportResponseDTO> {

    async generate(report: AdminBookingsReportResponseDTO): Promise<Buffer> {

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Admin Bookings Report");

        sheet.columns = [
            { header: "Date", key: "date", width: 22, },
            { header: "Booking ID", key: "bookingId", width: 35, },
            { header: "User", key: "user", width: 25, },
            { header: "Partner", key: "partner", width: 25, },
            { header: "Amount", key: "amount", width: 18, },
            { header: "Commission", key: "commission", width: 18, },
            { header: "Status", key: "status", width: 20, },
        ];


        sheet.getRow(1).font = { bold: true, size: 12, };

        report.bookings.forEach((booking) => {

            sheet.addRow({
                date: new Date(booking.createdAt).toLocaleString(),
                bookingId: booking.bookingId,
                user: booking.user,
                partner: booking.partnerName,
                amount: booking.totalAmount,
                commission: booking.platformCommission,
                status: booking.status,
            });
        });

        sheet.getColumn("amount").numFmt = "₹#,##0.00";
        sheet.getColumn("commission").numFmt = "₹#,##0.00";

        const buffer = await workbook.xlsx.writeBuffer();

        return Buffer.from(buffer);
    }
}