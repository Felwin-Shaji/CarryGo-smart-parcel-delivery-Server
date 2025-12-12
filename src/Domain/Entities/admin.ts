import type { KYCStatus, Role } from "../../Infrastructure/Types/types.js";

export class Admin {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public mobile: string | null,
    public password: string | null,
    public role:Role,
    public isAdmin:boolean,
    public kycStatus:KYCStatus,
    public walletBalance: number = 0,
    public isBlocked: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    this.validateRegistration()
  };

  private validateRegistration(): void {
    this.validateWalletBalance();
  }


  private validateWalletBalance(): void {
    if (this.walletBalance < 0) {
      throw new Error("Wallet balance cannot be negative");
    }
  }
}
