import { Role } from "../../../Domain/Enums/Roles";
import { GetSettlementReportQuery, SalesReportRequestDTO, SalesReportResponseDTO } from "../../Dto/Agency/agencyDashboard.dto";
import { ITransactionRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { IAgencyGetSalesReportUseCase } from "../../interfaces/useCase_Interfaces/Agency/IAgencyGetSalesReportUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class AgencyGetSalesReportUseCase implements IAgencyGetSalesReportUseCase {
    constructor(
        @inject("ITransactionRepository") private _transactionRepo: ITransactionRepository,
        @inject("IWalletRepository") private _walletRepo: IWalletRepository,
    ) { }

    async execute(agencyId: string, query: SalesReportRequestDTO): Promise<SalesReportResponseDTO> {

        const { fromDate, toDate, page = 1, limit = 10 } = query;
        const queryPayload: GetSettlementReportQuery = {
            page: Number(page),
            limit: Number(limit),
        };
        if (fromDate) queryPayload.fromDate = fromDate;
        if (toDate) queryPayload.toDate = toDate;


        const wallet = await this._walletRepo.findByOwner(Role.AGENCY, agencyId);

        if (!wallet || !wallet.id) {
            return {
                data: [],
                summary: { totalRevenue: 0, totalBookings: 0 },
                pagination: { page: Number(page), limit: Number(limit), total: 0 },
            };
        }

        const result = await this._transactionRepo.getSettlementReport(wallet.id, queryPayload);

        return result;
    };
}