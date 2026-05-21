import { AppError } from "../../../Domain/utils/customError";
import { ExportSalesReportDTO, ExportSalesReportResponseDTO, SalesReportRequestDTO, SalesReportResponseDTO } from "../../Dto/Agency/agencyDashboard.dto";
import { IReportGenerator } from "../../interfaces/services_Interfaces/Report/IReportService";
import { IAgencyExportSalesReportUseCase } from "../../interfaces/useCase_Interfaces/Agency/IAgencyExportSalesReportUsecase";
import { IAgencyGetSalesReportUseCase } from "../../interfaces/useCase_Interfaces/Agency/IAgencyGetSalesReportUseCase";
import { inject, injectable } from "tsyringe";

type ExportType = "excel" | "pdf";

type ReportGenerators = {
    excel: IReportGenerator<SalesReportResponseDTO>;
    pdf: IReportGenerator<SalesReportResponseDTO>;
};


@injectable()
export class AgencyExportSalesReportUseCase implements IAgencyExportSalesReportUseCase {
    constructor(
        @inject("IAgencyGetSalesReportUseCase") private readonly _getSalesReportUseCase: IAgencyGetSalesReportUseCase,
        @inject("ReportGenerators") private readonly _generators: ReportGenerators
    ) { };

    async execute(agencyId: string, dto: ExportSalesReportDTO): Promise<ExportSalesReportResponseDTO> {

        const { type = "excel", fromDate, toDate } = dto;
        const queryPayload: SalesReportRequestDTO = { page: 1, limit: 100000 };
        if (fromDate) queryPayload.fromDate = fromDate;
        if (toDate) queryPayload.toDate = toDate;

        //  Validate generator
        const generator = this._generators[type];
        if (!generator) {
            throw new AppError("Unsupported export type");
        };

        //  Get report data (reuse existing logic)
        const report = await this._getSalesReportUseCase.execute(agencyId, queryPayload);

        //  Generate file
        const file = await generator.generate(report);

        //  MIME types
        const mimeMap: Record<ExportType, string> = {
            excel:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            pdf: "application/pdf",
        };

        //  File extension
        const extension = type === "excel" ? "xlsx" : "pdf";

        const fileName = `sales-report-${Date.now()}.${extension}`;

        return {
            file,
            mimeType: mimeMap[type],
            fileName,
        };

    }
}