import type { ClientSession } from "mongoose";
import { ITransactionRepository } from "../../../Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { Transaction } from "../../../Domain/Entities/Wallet/WalletTransaction";
import { TransactionDocument, TransactionModel } from "../../database/models/Wallet/transaction.schema";
import { BaseRepository } from "../baseRepositories";

export class TransactionRepository extends BaseRepository<TransactionDocument> implements ITransactionRepository {

    constructor() {
        super(TransactionModel)
    }

    async create(transaction: Transaction, session?: ClientSession): Promise<void> {

        const doc = {
            walletId: transaction.walletId,
            type: transaction.type,
            reason: transaction.reason,
            status: transaction.status,

            amount: transaction.amount,

            orderId: transaction.orderId,
            payoutId: transaction.payoutId,
            gatewayReferenceId: transaction.gatewayReferenceId,

            balanceAfter: transaction.balanceAfter,
            metadata: transaction.metadata,
        };

        await this.model.create([doc], { session });
    }

    async findRecentByWallet(walletId: string, limit: number): Promise<Transaction[]> {

        const docs = await this.model
            .find({ walletId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return docs.map(doc => this.toDomain(doc));
    }

    async findByGatewayReferenceId(gatewayReferenceId: string): Promise<Transaction | null> {
        const doc = await this.model.findOne({
            gatewayReferenceId: gatewayReferenceId, 
        });

        console.log(doc)


        if (!doc) return null;

        return this.toDomain(doc);
    }


    async markSuccess(
        transactionId: string,
        data: {
            balanceAfter: number;
            gatewayPaymentId: string;
        },
        session?: ClientSession
    ): Promise<void> {

        const options = session ? { session } : {};

        await this.model.findOneAndUpdate(
            { _id: transactionId, status: "PENDING" },
            {
                $set: {
                    status: "SUCCESS",
                    balanceAfter: data.balanceAfter,
                    gatewayReferenceId: data.gatewayPaymentId,
                },
            },
            options
        );
    }

    async markFailed(
        transactionId: string,
        session?: ClientSession
    ): Promise<void> {
        const options = session ? { session } : {};

        await this.findOneAndUpdate(
            { _id: transactionId, status: "PENDING" },
            { $set: { status: "FAILED" } },
            options
        );
    }


    private toDomain(doc: TransactionDocument): Transaction {
        return new Transaction(
            doc._id.toString(),
            doc.walletId.toString(),
            doc.type,
            doc.reason,
            doc.amount,
            doc.status,
            doc.balanceAfter,
            doc.orderId,
            doc.payoutId,
            doc.gatewayReferenceId,
            doc.metadata,
            doc.createdAt
        )
    }

}
