import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { Role } from "../../../Infrastructure/Types/types";
import { AppError } from "../../utils/customError";

export class Wallet {
    constructor(
        public readonly id: string | null,
        public readonly ownerType: Role,
        public readonly ownerId: string,

        private _balance: number = 0,
        private _lockedBalance: number = 0,

        public readonly createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }

    get balance(): number {
        return this._balance;
    }

    get lockedBalance(): number {
        return this._lockedBalance;
    }


    credit(amount: number) {
        if (amount <= 0) {
            throw new AppError(WALLET_MESSAGES.INVALID_AMOUNT);
        }

        this._balance += amount;
        this.touch();
        this.validate();
    }

    debit(amount: number) {
        if (amount <= 0) {
            throw new AppError(WALLET_MESSAGES.INVALID_AMOUNT);
        }

        if (this._balance < amount) {
            throw new AppError(WALLET_MESSAGES.INSUFFICIENT_BALANCE);
        }

        this._balance -= amount;
        this.touch();
        this.validate();
    }

    hold(amount: number) {
        if (amount <= 0) {
            throw new AppError(WALLET_MESSAGES.INVALID_AMOUNT);
        }
        this._lockedBalance += amount;

        this.touch();
        this.validate();
    }

    release(amount: number) {
        if (amount <= 0) {
            throw new AppError(WALLET_MESSAGES.INVALID_AMOUNT);
        }

        if (this._lockedBalance < amount) {
            throw new AppError(WALLET_MESSAGES.INSUFFICIENT_LOCKED_BALANCE);
        }

        this._lockedBalance -= amount;
        this._balance += amount;

        this.touch();
        this.validate();
    }

    /* ================= HELPERS ================= */

    private touch() {
        this.updatedAt = new Date();
    }

    private validate() {
        if (this._balance < 0) {
            throw new AppError(WALLET_MESSAGES.CANNOT_BE_NEGATIVE);
        }

        if (this._lockedBalance < 0) {
            throw new AppError(WALLET_MESSAGES.LOCKED_BALANCE_CANNOT_BE_NEGATIVE);
        }
    }
}

