import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import {
    ExportAdminBookingsReportDTO,
    ExportAdminBookingsReportResponseDTO,
    AdminBookingsReportDTO,
} from "../../DTOs/Admin/adminDashboard.dto";
import { IGetAdminBookingsReportUseCase } from "../../Interfaces/UseCases/Admin/IGetAdminBookingsReportUseCase";
import { IExportAdminBookingsReportUseCase } from "../../Interfaces/UseCases/Admin/IExportAdminBookingsReportUseCase";
import { ADMIN_MESSAGES } from "../../../Infrastructure/Constants/Messages/adminMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { AdminReportGenerators, ExportType, } from "../../../Infrastructure/Types/reportGenerator.types";



@injectable()
export class ExportAdminBookingsReportUseCase implements IExportAdminBookingsReportUseCase {
    constructor(
        @inject("IGetAdminBookingsReportUseCase") private readonly _getAdminBookingsReportUseCase: IGetAdminBookingsReportUseCase,
        @inject("AdminReportGenerators") private readonly _generators: AdminReportGenerators
    ) { };

    async execute(dto: ExportAdminBookingsReportDTO): Promise<ExportAdminBookingsReportResponseDTO> {

        const { type = "excel", fromDate, toDate, deliveryType, status, } = dto;

        // Validate Generator
        const generator = this._generators[type];
        if (!generator) throw new AppError(ADMIN_MESSAGES.UNSUPPORTED_EXPORT_TYPE, STATUS.BAD_REQUEST);

        const queryPayload: AdminBookingsReportDTO = {
            page: "1",
            limit: "100000",
        };

        if (fromDate) queryPayload.fromDate = fromDate;
        if (toDate) queryPayload.toDate = toDate;
        if (deliveryType) queryPayload.deliveryType = deliveryType;
        if (status) queryPayload.status = status;

        // Fetch Report
        const report = await this._getAdminBookingsReportUseCase.execute(queryPayload);

        // Generate File
        const file = await generator.generate(report);

        // MIME TYPES
        const mimeMap:
            Record<ExportType, string> = {
            excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            pdf: "application/pdf",
        };

        // EXTENSION
        const extension = type === "excel" ? "xlsx" : "pdf";
        const fileName = `admin-bookings-report-${Date.now()}.${extension}`;

        return {
            file,
            mimeType: mimeMap[type],
            fileName,
        };
    }
}