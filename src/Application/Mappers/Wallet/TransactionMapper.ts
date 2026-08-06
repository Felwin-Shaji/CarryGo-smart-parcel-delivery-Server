import { Transaction, TransactionReason } from "../../../Domain/Entities/Wallet/WalletTransaction";

export class TransactionMapper {

    static createBookingHold(
    walletId: string,
    amount: number,
    balanceAfter: number,
    bookingId: string,
    gatewayReferenceId?: string
): Transaction {
    return new Transaction(
        null,
        walletId,
        "HOLD",
        "BOOKING_PAYMENT",
        amount,
        "SUCCESS",
        balanceAfter,
        bookingId,
        undefined,
        gatewayReferenceId,
        {
            source: "BOOKING",
        }
    );
}

    static createCredit(
        walletId: string,
        amount: number,
        reason: TransactionReason,
        balanceAfter: number,
        metadata?: Record<string, unknown>
    ): Transaction {
        return new Transaction(
            null,
            walletId,
            "CREDIT",
            reason,
            amount,
            "SUCCESS",
            balanceAfter,
            undefined,
            undefined,
            undefined,
            metadata
        );
    }

    static createDebit(
        walletId: string,
        amount: number,
        reason: TransactionReason,
        balanceAfter: number,
        metadata?: Record<string, unknown>
    ): Transaction {
        return new Transaction(
            null,
            walletId,
            "DEBIT",
            reason,
            amount,
            "SUCCESS",
            balanceAfter,
            undefined,
            undefined,
            undefined,
            metadata
        );
    }

    static createHold(
        walletId: string,
        amount: number,
        balanceAfter: number,
        metadata?: Record<string, unknown>
    ): Transaction {
        return new Transaction(
            null,
            walletId,
            "HOLD",
            "BOOKING_PAYMENT",
            amount,
            "SUCCESS",
            balanceAfter,
            undefined,
            undefined,
            undefined,
            metadata
        );
    }

    static createRelease(
        walletId: string,
        amount: number,
        balanceAfter: number,
        metadata?: Record<string, unknown>
    ): Transaction {
        return new Transaction(
            null,
            walletId,
            "RELEASE",
            "SETTLEMENT",
            amount,
            "SUCCESS",
            balanceAfter,
            undefined,
            undefined,
            undefined,
            metadata
        );
    }
}