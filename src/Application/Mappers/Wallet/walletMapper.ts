import { Wallet } from "../../../Domain/Entities/Wallet/Wallet";
import { Transaction } from "../../../Domain/Entities/Wallet/WalletTransaction";
import { Role } from "../../../Infrastructure/Types/types";
import { GetWalletOverviewResponseDTO, GetWalletResponseDTO } from "../../Dto/Wallet/Wallet.dto";

export class WalletMapper {
    static toCreateWallet(ownerId: string, ownerType: Role): Wallet {
        return new Wallet(
            null,
            ownerType,
            ownerId,
            0,
            0
        )
    }

    static toGetWalletOverviewResponse(wallet: Wallet, transactions: Transaction[]): GetWalletOverviewResponseDTO {
        return {
            balance: wallet.balance,
            lockedBalance: wallet.lockedBalance,
            recentTransactions: transactions.map(tx => ({
                id: tx.id!,
                type: tx.type,
                reason: tx.reason,
                amount: tx.amount,
                status: tx.status,
                createdAt: tx.createdAt,
            })),
        };
    }

    static toGetWalletResponse(wallet: Wallet): GetWalletResponseDTO {
        return {
            walletId: wallet.id!,
            ownerType: wallet.ownerType,
            balance: wallet.balance,
            lockedBalance: wallet.lockedBalance,
        };
    }
}