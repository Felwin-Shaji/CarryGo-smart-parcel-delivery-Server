import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { Role } from "../../../Infrastructure/Types/types";
import { AppError } from "../../utils/customError";

export class Wallet {
    constructor(
        public id: string | null,
        public ownerType: Role,
        public ownerId: string,

        public balance: number = 0,
        public lockedBalance: number = 0,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }

    private validate() {
        if (this.balance < 0) {
            throw new AppError(WALLET_MESSAGES.CANNOT_BE_NEGATIVE);
        }

        if (this.lockedBalance < 0) {
            throw new AppError(WALLET_MESSAGES.LOCKED_BALANCE_CANNOT_BE_NEGATIVE);
        }
    }
}
