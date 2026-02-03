import { Role } from "../../../Infrastructure/Types/types";

export interface GetWalletResponseDTO {
    walletId: string;
    ownerType: Role;
    balance: number;
    lockedBalance: number;
}

export interface WalletTransactionDTO {
    id: string;
    type: string;
    reason: string;
    amount: number;
    status: string;
    createdAt: Date;
}

export interface GetWalletOverviewResponseDTO {
    balance: number;
    lockedBalance: number;
    recentTransactions: WalletTransactionDTO[];
}


export interface getWalletOverviewRequestDTO {
    ownerId: string;
    ownerType: Role;
    transactionLimit?: number;
}

export interface CreateWalletTopupOrderDTO {
    key:string;
    orderId: string;
    amount: number;
    currency: string
}
