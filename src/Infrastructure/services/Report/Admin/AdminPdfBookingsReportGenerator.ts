import PDFDocument from "pdfkit";
import { injectable } from "tsyringe";

import { IReportGenerator } from "../../../../Application/interfaces/services_Interfaces/Report/IReportService";
import { AdminBookingsReportResponseDTO } from "../../../../Application/Dto/Admin/adminDashboard.dto";

@injectable()
export class AdminPdfBookingsReportGenerator implements IReportGenerator<AdminBookingsReportResponseDTO> {

    async generate(
        report: AdminBookingsReportResponseDTO
    ): Promise<Buffer> {

        const doc = new PDFDocument({
            margin: 25,
            size: "A4",
        });

        const buffers: Buffer[] = [];

        doc.on("data", buffers.push.bind(buffers));

        const pageWidth = doc.page.width;
        const usableWidth = pageWidth - 50;

        // Currency Formatter
        const formatCurrency = (amount: number) => {
            return `Rs. ${new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amount)}`;
        };

        // HEADER
        doc.rect(0, 0, pageWidth, 75).fill("#111827");

        doc
            .fillColor("#FFFFFF")
            .font("Helvetica-Bold")
            .fontSize(22)
            .text("ADMIN BOOKINGS REPORT", 40, 24);

        doc
            .font("Helvetica")
            .fontSize(9)
            .fillColor("#E5E7EB")
            .text(
                `Generated: ${new Date().toLocaleString("en-IN")}`,
                0,
                30,
                {
                    width: pageWidth - 40,
                    align: "right",
                }
            );

        // TABLE CONFIG
        const COL = {
            date: { x: 25, w: 60 },
            bookingId: { x: 90, w: 145 },
            user: { x: 240, w: 95 },
            partner: { x: 340, w: 110 },
            amount: { x: 455, w: 60 },
            commission: { x: 520, w: 55 },
        };

        const drawTableHeader = (top: number) => {

            doc.rect(25, top - 4, usableWidth, 22)
                .fill("#1F2937");

            doc
                .fillColor("#FFFFFF")
                .font("Helvetica-Bold")
                .fontSize(9);

            doc.text("Date", COL.date.x, top, {
                width: COL.date.w,
            });

            doc.text("Booking ID", COL.bookingId.x, top, {
                width: COL.bookingId.w,
            });

            doc.text("User", COL.user.x, top, {
                width: COL.user.w,
            });

            doc.text("Partner", COL.partner.x, top, {
                width: COL.partner.w,
            });

            doc.text("Amount", COL.amount.x, top, {
                width: COL.amount.w,
                align: "right",
            });

            doc.text("Commission", COL.commission.x, top, {
                width: COL.commission.w,
                align: "right",
            });
        };

        // INITIAL TABLE
        const tableTop = 100;

        drawTableHeader(tableTop);

        let y = tableTop + 28;

        doc.font("Helvetica").fontSize(9);

        // TABLE ROWS
        report.bookings.forEach((booking, index) => {

            // PAGE BREAK
            if (y > doc.page.height - 120) {

                doc.addPage();

                y = 50;

                drawTableHeader(y);

                y += 28;

                doc.font("Helvetica").fontSize(9);
            }

            // Zebra Row
            if (index % 2 === 0) {

                doc.rect(25, y - 4, usableWidth, 21)
                    .fill("#F9FAFB");
            }

            const formattedDate = new Date(
                booking.createdAt
            ).toLocaleDateString("en-IN");

            doc.fillColor("#111827");

            doc.text(formattedDate, COL.date.x, y, {
                width: COL.date.w,
                lineBreak: false,
            });

            doc.text(booking.bookingId, COL.bookingId.x, y, {
                width: COL.bookingId.w,
                lineBreak: false,
            });

            doc.text(booking.user, COL.user.x, y, {
                width: COL.user.w,
                ellipsis: true,
                lineBreak: false,
            });

            doc.text(booking.partnerName, COL.partner.x, y, {
                width: COL.partner.w,
                ellipsis: true,
                lineBreak: false,
            });

            doc.text(
                formatCurrency(booking.totalAmount),
                COL.amount.x,
                y,
                {
                    width: COL.amount.w,
                    align: "right",
                    lineBreak: false,
                }
            );

            doc.text(
                formatCurrency(booking.platformCommission),
                COL.commission.x,
                y,
                {
                    width: COL.commission.w,
                    align: "right",
                    lineBreak: false,
                }
            );

            // Commission
            doc.fillColor("#2563EB");

            doc.text(
                formatCurrency(booking.platformCommission),
                COL.commission.x,
                y,
                {
                    width: COL.commission.w,
                    align: "right",
                    lineBreak: false,
                }
            );

            y += 24;
        });

        // DIVIDER
        doc.moveTo(25, y + 10)
            .lineTo(pageWidth - 40, y + 10)
            .strokeColor("#CBD5E1")
            .lineWidth(0.5)
            .stroke();

        // SUMMARY CARD
        const summaryTop = y + 25;

        doc.roundedRect(40, summaryTop, 260, 95, 8)
            .fill("#F3F4F6");

        // Accent bar
        doc.rect(40, summaryTop, 6, 95)
            .fill("#111827");

        doc
            .fillColor("#111827")
            .font("Helvetica-Bold")
            .fontSize(12)
            .text("Report Summary", 58, summaryTop + 12);

        const totalRevenue = report.bookings.reduce(
            (acc, booking) => acc + booking.totalAmount,
            0
        );

        const totalCommission = report.bookings.reduce(
            (acc, booking) => acc + booking.platformCommission,
            0
        );

        doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor("#374151")
            .text(
                `Total Revenue: ${formatCurrency(totalRevenue)}`,
                58,
                summaryTop + 38
            )
            .text(
                `Total Commission: ${formatCurrency(totalCommission)}`,
                58,
                summaryTop + 58
            )
            .text(
                `Total Records: ${report.totalCount}`,
                58,
                summaryTop + 78
            );

        // FOOTER
        const footerY = doc.page.height - 35;

        doc
            .font("Helvetica")
            .fontSize(8)
            .fillColor("#9CA3AF")
            .text(
                "CarryGo Admin Report — Confidential",
                40,
                footerY,
                {
                    width: usableWidth,
                    align: "center",
                }
            );

        // END
        doc.end();

        return await new Promise((resolve) => {
            doc.on("end", () => {
                resolve(Buffer.concat(buffers));
            });
        });
    }
}