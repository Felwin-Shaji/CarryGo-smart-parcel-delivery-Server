export interface IAgencyExportSalesReportUseCase {
    execute(
        agencyId: string,
        dto: {
            type?: "excel" | "pdf";
            fromDate?: string;
            toDate?: string;
        }
    ): Promise<{
        file: Uint8Array;
        mimeType: string;
        fileName: string;
    }>;
}