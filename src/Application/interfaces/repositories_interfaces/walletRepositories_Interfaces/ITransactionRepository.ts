import { ClientSession } from "mongoose";
import { Transaction } from "../../../../Domain/Entities/Wallet/WalletTransaction";
import { GetSettlementReportQuery, SalesChartRequestDTO, SalesChartResponseDTO, SalesReportResponseDTO } from "../../../Dto/Agency/agencyDashboard.dto";

export interface ITransactionRepository {
    create(transation: Transaction, session?: ClientSession): Promise<void>

    findRecentByWallet(walletId: string, limit: number): Promise<Transaction[]>;

    findByGatewayReferenceId(gatewayReferenceId: string): Promise<Transaction | null>;

    markSuccess(
        transactionId: string,
        data: {
            balanceAfter: number;
            gatewayPaymentId: string;
        },
        session?: ClientSession
    ): Promise<void>;


    markFailed(
        transactionId: string,
        session?: ClientSession
    ): Promise<void>;

    sumSettlementByAgency(agencyId: string): Promise<number>;

    getSettlementReport(walletId: string, query: GetSettlementReportQuery): Promise<SalesReportResponseDTO>;

    groupSettlementByDate(walletId: string, query: SalesChartRequestDTO): Promise<SalesChartResponseDTO>;
}