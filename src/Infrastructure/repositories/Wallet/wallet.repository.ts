import type { ClientSession } from "mongoose";
import { Wallet } from "../../../Domain/Entities/Wallet/Wallet";
import { WalletDocument, WalletModel } from "../../database/models/Wallet/wallet.schema";
import { IWalletRepository } from "../../../Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { BaseRepository } from "../baseRepositories";
import { Role } from "../../Types/types";

export class WalletRepository extends BaseRepository<WalletDocument> implements IWalletRepository {

    constructor() {
        super(WalletModel);
    }

    async findByOwner(ownerType: Role, ownerId: string): Promise<Wallet | null> {
        const wallet = await WalletModel.findOne({ ownerType, ownerId }).lean();
        return wallet ? this.toEntity(wallet) : null;
    }

    async getAdminWallet(): Promise<Wallet | null> {
        const wallet = await this.model.findOne({ ownerType: "admin", ownerId:"6916fac9e1872f40684651c2" }).lean();
        return wallet ? this.toEntity(wallet) : null;
    }

    async findWalletById(walletId: string): Promise<Wallet | null> {
        const wallet = await this.model.findById(walletId).lean();
        return wallet ? this.toEntity(wallet) : null;
    }

    async update(wallet: Wallet, session?: ClientSession): Promise<void> {
        const updateOptions = session ? { session } : undefined;
        await this.model.updateOne(
            { _id: wallet.id },
            {
                $set: {
                    balance: wallet.balance,
                    lockedBalance: wallet.lockedBalance,
                    updatedAt: wallet.updatedAt,
                },
            },
            updateOptions
        );
    }

    async create(wallet: Wallet): Promise<void> {
        await this.model.create({
            ownerType: wallet.ownerType,
            ownerId: wallet.ownerId,
            balance: wallet.balance,
            lockedBalance: wallet.lockedBalance,
        });
    }

    private toEntity(wallet: WalletDocument): Wallet {
        return new Wallet(
            wallet._id.toString(),
            wallet.ownerType,
            wallet.ownerId.toString(),
            wallet.balance,
            wallet.lockedBalance,
            wallet.createdAt,
            wallet.updatedAt
        );
    }
}
