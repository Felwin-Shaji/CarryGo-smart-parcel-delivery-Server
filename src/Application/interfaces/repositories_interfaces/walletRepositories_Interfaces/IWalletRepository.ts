import { Wallet } from "../../../../Domain/Entities/Wallet/Wallet";

export type WalletOwnerType = "USER" | "AGENCY" | "ADMIN";


export interface IWalletRepository {
    findByOwner(ownerType: WalletOwnerType, ownerId: string): Promise<Wallet | null>;

    // createWallet(ownerType: WalletOwnerType, ownerId: string): Promise<Wallet>;

    // creditBalance(walletId: string, amount: number): Promise<void>;

    // debitBalance(walletId: string, amount: number): Promise<void>;

    // lockAmount(walletId: string, amount: number): Promise<void>;

    // releaseLockedAmount(walletId: string, amount: number): Promise<void>;
}
