import type { KYCStatus, Role } from "../../Infrastructure/Types/types";
import { AppError } from "../utils/customError";
import { Address } from "./User/Address";

export class User {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public mobile: string | null,
    public password: string | null, 
    public role: Role,
    public googleId?: string | null,
    public authProvider?: "local" | "google",
    public kycStatus: KYCStatus = "PENDING",
    public rejectReason: string | null = null,
    public walletBalance: number = 0,
    public isBlocked: boolean = false,
    public tokenVersion: number = 0,
    public addresses: Address[] = [],
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
