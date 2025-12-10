import { Types } from "mongoose";
import { KYCStatus, Role } from "../../../Infrastructure/Types/types.js";
import { AppError } from "../../utils/customError.js";


export class HubWorker {
  constructor(
    public _id: string | null,
    public hubId: Types.ObjectId,
    public name: string,
    public email: string,
    public mobile: string | null,
    public password: string | null,
    public role:Role,
    public kycStatus: KYCStatus = "PENDING",
    public walletBalance: number = 0,
    public isBlocked: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    this.validateRegistration();
  };

  private validateRegistration(): void {
    this.validateWalletBalance();
  };


  private validateWalletBalance(): void {
    if (this.walletBalance < 0) {
      throw new AppError("Wallet balance cannot be negative");
    };
  };
};
