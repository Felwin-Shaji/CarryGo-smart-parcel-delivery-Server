import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { AppError } from "../../utils/customError";

export type TransactionType =
    | "CREDIT"
    | "DEBIT"
    | "HOLD"
    | "RELEASE";

export type TransactionReason =
    | "WALLET_TOPUP"
    | "BOOKING_PAYMENT"
    | "REFUND"
    | "COMMISSION"
    | "SETTLEMENT"
    | "PAYOUT"
    | "ADJUSTMENT";


export type TransactionStatus =
    | "PENDING"
    | "SUCCESS"
    | "FAILED";

export class Transaction {
    constructor(
        public readonly id: string | null,
        public readonly walletId: string,

        public readonly type: TransactionType,
        public readonly reason: TransactionReason,

        public readonly amount: number,
        public readonly status: TransactionStatus,
        
        public readonly balanceAfter?: number,

        public readonly orderId?: string,
        public readonly payoutId?: string,
        public readonly gatewayReferenceId?: string,

        public readonly metadata?: Record<string, any>,
        public readonly createdAt: Date = new Date()
    ) {
        if (amount <= 0) {
            throw new AppError(WALLET_MESSAGES.TRANSATION_MUST_BE_POSITIVE);
        }
    }
}

