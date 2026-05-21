import { injectable } from "tsyringe";
import ExcelJS from "exceljs";
import { IReportGenerator } from "../../../../Application/interfaces/services_Interfaces/Report/IReportService";
import { SalesReportResponseDTO } from "../../../../Application/Dto/Agency/agencyDashboard.dto";

@injectable()
export class ExcelReportGeneratorService implements IReportGenerator<SalesReportResponseDTO> {
    async generate(report: SalesReportResponseDTO): Promise<Buffer> {

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Sales Report");

        sheet.columns = [
            { header: "Date", key: "date", width: 20 },
            { header: "Booking ID", key: "bookingId", width: 25 },
            { header: "Gross Amount", key: "grossAmount", width: 15 },
            { header: "Commission", key: "commission", width: 15 },
            { header: "Net Amount", key: "netAmount", width: 15 },
            { header: "Status", key: "paymentStatus", width: 15 },
        ];
        
        report.data.forEach((row) => {
            sheet.addRow({
                date: new Date(row.date).toLocaleString(),
                bookingId: row.bookingId,
                grossAmount: row.grossAmount,
                commission: row.commission ?? 0,
                netAmount: row.netAmount,
                paymentStatus: row.paymentStatus,
            });
        });

        return Buffer.from(await workbook.xlsx.writeBuffer());
    }
}