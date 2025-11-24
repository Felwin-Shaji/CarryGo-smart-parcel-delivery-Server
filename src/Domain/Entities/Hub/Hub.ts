import { Types } from "mongoose";
import { AppError } from "../../utils/customError.js";
import { KYCStatus, Role } from "../../../Infrastructure/Types/types.js";


export class Hub {
    constructor(
        public id: string | null,
        public agencyId: Types.ObjectId,

        public name: string,
        public email: string,
        public mobile: string,
        public password: string,

        public role: Role="hub",

        public address: {
            addressLine1: string;
            city: string;
            state: string;
            pincode: string;
        },
        public location: {
            lat: number;
            lng: number;
        },

        public verificationImage: string,
        public status: KYCStatus = "APPROVED",
        public walletBalance: number = 0,
        public isBlocked: boolean = false,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }
    private validate(): void {
        this.validateWalletBalance();
    }

    private validateWalletBalance(): void {
        if (this.walletBalance < 0) {
            throw new AppError("Wallet balance cannot be negative");
        }
    }

}
