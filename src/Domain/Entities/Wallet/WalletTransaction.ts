import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { AppError } from "../../utils/customError";

export type WalletTransactionType =
    | "CREDIT"
    | "DEBIT";

export type WalletTransactionReason =
    | "BOOKING_PAYMENT"
    | "REFUND"
    | "COMMISSION"
    | "SETTLEMENT"
    | "PAYOUT";

export class WalletTransaction {
    constructor(
        public id: string | null,
        public walletId: string,
        public type: WalletTransactionType,
        public reason: WalletTransactionReason,
        public amount: number,
        public referenceId: string,
        public createdAt: Date = new Date()
    ) {
        if (amount <= 0) {
            throw new AppError(WALLET_MESSAGES.TRANSATION_MUST_BE_POSITIVE);
        }
    }
}
