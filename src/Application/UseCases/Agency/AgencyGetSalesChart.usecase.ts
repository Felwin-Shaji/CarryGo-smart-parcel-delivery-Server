import { Role } from "../../../Domain/Enums/Roles";
import { SalesChartRequestDTO, SalesChartResponseDTO } from "../../DTOs/Agency/agencyDashboard.dto";
import { ITransactionRepository } from "../../Interfaces/Repositories/Wallet/ITransactionRepository";
import { IWalletRepository } from "../../Interfaces/Repositories/Wallet/IWalletRepository";
import { IAgencyGetSalesChartUseCase } from "../../Interfaces/UseCases/Agency/IAgencyGetSalesChartUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class AgencyGetSalesChartUseCase implements IAgencyGetSalesChartUseCase {
    constructor(
        @inject("ITransactionRepository") private _transactionRepo: ITransactionRepository,
        @inject("IWalletRepository") private _walletRepo: IWalletRepository,
    ) { };

    async execute(agencyId: string, query: SalesChartRequestDTO): Promise<SalesChartResponseDTO> {
        const { fromDate, toDate } = query;

        const queryPaylod: SalesChartRequestDTO = {}
        if (fromDate) queryPaylod.fromDate = fromDate;
        if (toDate) queryPaylod.toDate = toDate;

        const wallet = await this._walletRepo.findByOwner(Role.AGENCY, agencyId);
        if (!wallet || !wallet.id) {
            return { data: [] };
        }

        return await this._transactionRepo.groupSettlementByDate(wallet.id, queryPaylod);

    }
};