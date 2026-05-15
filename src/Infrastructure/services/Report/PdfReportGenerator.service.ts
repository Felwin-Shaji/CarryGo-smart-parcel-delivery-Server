import PDFDocument from "pdfkit";
import { injectable } from "tsyringe";
import { SalesReportResponseDTO } from "../../../Application/Dto/Agency/agencyDashboard.dto";
import { IReportGenerator } from "../../../Application/interfaces/services_Interfaces/Report/IReportService";

@injectable()
export class PdfReportGeneratorService implements IReportGenerator {
    async generate(report: SalesReportResponseDTO): Promise<Buffer> {

        const doc = new PDFDocument({ margin: 40 });
        const buffers: Buffer[] = [];

        doc.on("data", buffers.push.bind(buffers));

        const pageWidth = doc.page.width; // 612pt (letter)
        const usableWidth = pageWidth - 80; // 532pt (40pt margin each side)

        // ─── RUPEE FORMATTER (avoids broken ₹ glyph in Helvetica) ───────────
        const formatCurrency = (val: number): string => {
            const formatted = new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(val);
            return `Rs. ${formatted}`;
        };

        // ─── HEADER BAR ──────────────────────────────────────────────────────
        doc.rect(0, 0, pageWidth, 70).fill("#0F172A");

        doc
            .fillColor("#FFFFFF")
            .fontSize(20)
            .font("Helvetica-Bold")
            .text("SALES REPORT", 40, 22);

        doc
            .fontSize(9)
            .font("Helvetica")
            .text(`Generated: ${new Date().toLocaleString("en-IN")}`, 0, 28, {
                width: pageWidth - 40,
                align: "right",
            });

        // ─── COLUMN LAYOUT ───────────────────────────────────────────────────
        // Total usable: 532pt  (left=40, right=572)
        // Date:60 | BookingID:155 | Gross:75 | Commission:85 | Net:75 | Status:62 | padding
        const COL = {
            date: { x: 40, w: 60 },
            booking: { x: 105, w: 160 },
            gross: { x: 270, w: 75 },
            commission: { x: 350, w: 90 },
            net: { x: 445, w: 72 },
            status: { x: 520, w: 52 },
        };

        const drawTableHeader = (top: number) => {
            // Header background
            doc.rect(40, top - 4, usableWidth, 22).fill("#1E293B");

            doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(9);
            doc.text("Date", COL.date.x, top, { width: COL.date.w });
            doc.text("Booking ID", COL.booking.x, top, { width: COL.booking.w });
            doc.text("Gross", COL.gross.x, top, { width: COL.gross.w, align: "right" });
            doc.text("Commission", COL.commission.x, top, { width: COL.commission.w, align: "right" });
            doc.text("Net", COL.net.x, top, { width: COL.net.w, align: "right" });
            doc.text("Status", COL.status.x, top, { width: COL.status.w, align: "center" });
        };

        // ─── FIRST PAGE TABLE HEADER ─────────────────────────────────────────
        const firstTableTop = 90;
        drawTableHeader(firstTableTop);

        let y = firstTableTop + 26;
        let isFirstPage = true;

        // ─── TABLE ROWS ───────────────────────────────────────────────────────
        doc.font("Helvetica").fontSize(9);

        report.data.forEach((row, index) => {
            // Pagination: add new page before overflow
            if (y > doc.page.height - 110) {
                doc.addPage();
                y = 40;
                isFirstPage = false;
                drawTableHeader(y);
                y += 26;
                doc.font("Helvetica").fontSize(9);
            }

            // Zebra striping
            if (index % 2 === 0) {
                doc.rect(40, y - 3, usableWidth, 20).fill("#F8FAFC");
            }

            const formattedDate = new Date(row.date).toLocaleDateString("en-IN");

            doc.fillColor("#111827");
            doc.text(formattedDate, COL.date.x, y, { width: COL.date.w, lineBreak: false });
            doc.text(row.bookingId, COL.booking.x, y, { width: COL.booking.w, lineBreak: false });
            doc.text(formatCurrency(row.grossAmount),
                COL.gross.x, y, { width: COL.gross.w, align: "right", lineBreak: false });

            doc.fillColor("#2563EB");
            doc.text(formatCurrency(row.commission ?? 0),
                COL.commission.x, y, { width: COL.commission.w, align: "right", lineBreak: false });

            doc.fillColor("#111827");
            doc.text(formatCurrency(row.netAmount), COL.net.x, y, { width: COL.net.w, align: "right", lineBreak: false });

            // Status badge colour
            const isPaid = row.paymentStatus === "PAID";
            doc.fillColor(isPaid ? "#15803D" : "#DC2626");
            doc.text(row.paymentStatus, COL.status.x, y, { width: COL.status.w, align: "center", lineBreak: false });

            doc.fillColor("#111827");
            y += 22;
        });

        // ─── DIVIDER ─────────────────────────────────────────────────────────
        doc.moveTo(40, y + 10).lineTo(pageWidth - 40, y + 10).strokeColor("#CBD5E1").lineWidth(0.5).stroke();

        // ─── SUMMARY CARD ────────────────────────────────────────────────────
        const summaryTop = y + 24;
        const cardH = 90;

        doc.roundedRect(40, summaryTop, 260, cardH, 8).fill("#F1F5F9");
        doc.rect(40, summaryTop, 6, cardH).fill("#0F172A"); // left accent bar

        doc
            .fillColor("#0F172A")
            .font("Helvetica-Bold")
            .fontSize(12)
            .text("Summary", 58, summaryTop + 12);

        doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor("#374151")
            .text(`Total Revenue:   ${formatCurrency(report.summary.totalRevenue)}`, 58, summaryTop + 34)
            .text(`Total Bookings:  ${report.summary.totalBookings}`, 58, summaryTop + 54);

        // ─── FOOTER ──────────────────────────────────────────────────────────
        const footerY = doc.page.height - 35;
        doc
            .fontSize(8)
            .fillColor("#9CA3AF")
            .text("Confidential — generated automatically", 40, footerY, {
                width: usableWidth,
                align: "center",
            });

        doc.end();

        return await new Promise((resolve) => {
            doc.on("end", () => resolve(Buffer.concat(buffers)));
        });
    }
}