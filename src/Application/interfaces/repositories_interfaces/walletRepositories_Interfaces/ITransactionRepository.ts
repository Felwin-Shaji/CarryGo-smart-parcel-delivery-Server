import { ClientSession } from "mongoose";
import { Transaction } from "../../../../Domain/Entities/Wallet/WalletTransaction";

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
}