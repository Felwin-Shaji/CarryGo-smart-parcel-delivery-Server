import { IWalletRepository, WalletOwnerType } from "../../../Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { Wallet } from "../../../Domain/Entities/Wallet/Wallet";
import { WalletDocument, WalletModel } from "../../database/models/Wallet/wallet.schema";
import { BaseRepository } from "../baseRepositories";

export class WalletRepository extends BaseRepository<WalletDocument> implements IWalletRepository {

    constructor() {
        super(WalletModel)
    }


    async findByOwner(ownerType: WalletOwnerType, ownerId: string): Promise<Wallet | null> {

        const wallet = await this.model.findOne({
            ownerType,
            ownerId,
        }).lean();

        if (!wallet) return null;

        return this.toEntity(wallet)
    };


    private toEntity(wallet: WalletDocument): Wallet {
        return new Wallet(
            wallet._id.toString(),
            wallet.ownerType,
            wallet.ownerId.toString(),
            wallet.balance,
            wallet.lockedBalance,
            wallet.createdAt,
            wallet.updatedAt
        )
    }
}