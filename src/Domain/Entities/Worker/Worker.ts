import { Types } from "mongoose";
import { KYCStatus, Role } from "../../../Infrastructure/Types/types";
import { AppError } from "../../utils/customError";

export type WorkerRole = "PICKUP" | "TRANSPORT" | "OUT_FOR_DELIVERY";

export type WorkingStatus =
  | "AVAILABLE"   // ready for assignment
  | "BUSY"        // already assigned to shipment
  | "OFF_DUTY"
  | "ON_LEAVE"
  | "BREAK";


export class HubWorker {
  constructor(
    public id: string | null,
    public hubId: Types.ObjectId,
    public name: string,
    public email: string,
    public mobile: string | null,
    public password: string | null,
    public role: Role,

    public workerRole: WorkerRole,
    public workingStatus: WorkingStatus = "AVAILABLE",

    public kycStatus: KYCStatus = "PENDING",
    public walletBalance: number = 0,
    public isBlocked: boolean = false,
    public tokenVersion: number = 0,
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
