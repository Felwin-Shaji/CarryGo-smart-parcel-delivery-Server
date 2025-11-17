import type { KYCStatus, Role } from "../../Infrastructure/Types/types.js";
import { AppError } from "../utils/customError.js";

export class Agency {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public mobile: string | null,
    public password: string | null,
    public role: Role,
    public kycStatus: KYCStatus = "PENDING",
    public walletBalance: number = 0,
    public commisionRate:number = 1,
    public isBlocked: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) { 
    this.validateRegistration();
  };

  private validateRegistration(): void {
    this.validateWalletBalance();
    this.validateCommision();
  };

  private validateWalletBalance(): void {
    if (this.walletBalance < 0) {
      throw new AppError("Wallet balance cannot be negative");
    };
  };

  private validateCommision():void{
    if(this.commisionRate<= 0){
      throw new AppError("Commision cannot be Zero or nagitive");
    }
  }
};                         