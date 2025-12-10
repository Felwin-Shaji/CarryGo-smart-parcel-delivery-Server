import type { KYCStatus, Role } from "../../Infrastructure/Types/types.js";
import { AppError } from "../utils/customError.js";

export class User {
  constructor(
    public _id: string | null,
    public name: string,
    public email: string,
    public mobile: string | null,
    public password: string | null,
    public role:Role,
    public googleId?: string | null,
    public authProvider?: "local" | "google",
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
