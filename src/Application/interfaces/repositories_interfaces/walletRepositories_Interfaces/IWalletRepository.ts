import { Wallet } from "../../../../Domain/Entities/Wallet/Wallet";
import { Role } from "../../../../Infrastructure/Types/types";
import type { ClientSession } from "mongoose";

export interface IWalletRepository {
  findByOwner(ownerType: Role, ownerId: string): Promise<Wallet | null>;
  getAdminWallet(): Promise<Wallet | null>;
  findWalletById(walletId: string): Promise<Wallet | null>;

  update(wallet: Wallet, session?: ClientSession): Promise<void>;
  create(wallet: Wallet): Promise<void>; 
}