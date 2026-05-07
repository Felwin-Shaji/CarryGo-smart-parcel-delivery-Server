import { FilterQuery, Types, type ClientSession } from "mongoose";
import { ITransactionRepository } from "../../../Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { Transaction } from "../../../Domain/Entities/Wallet/WalletTransaction";
import { TransactionDocument, TransactionModel } from "../../database/models/Wallet/transaction.schema";
import { BaseRepository } from "../baseRepositories";
import { WalletModel } from "@/Infrastructure/database/models/Wallet/wallet.schema";
import { DateRangeFilter, GetSettlementReportQuery, SalesChartRequestDTO, SalesChartResponseDTO, SalesReportResponseDTO, SalesReportRowDTO, SettlementMatch } from "@/Application/Dto/Agency/agencyDashboard.dto";

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
    };

    async sumSettlementByAgency(agencyId: string): Promise<number> {

        //  Step 1: get agency wallet
        const wallet = await WalletModel.findOne({
            ownerId: new Types.ObjectId(agencyId),
            ownerType: "agency",
        });


        if (!wallet) return 0;

        //  Step 2: aggregate transactions
        const result = await TransactionModel.aggregate([
            {
                $match: {
                    walletId: wallet._id,
                    type: "CREDIT",
                    reason: "SETTLEMENT",
                    status: "SUCCESS",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);


        return result[0]?.total || 0;
    };

    async getSettlementReport(
        walletId: string,
        query: GetSettlementReportQuery
    ): Promise<SalesReportResponseDTO> {

        const { fromDate, toDate, page, limit } = query;

        const match: FilterQuery<TransactionDocument> = {
            walletId: new Types.ObjectId(walletId),
            type: "CREDIT",
            reason: "SETTLEMENT",
            status: "SUCCESS",
        };

        // Date filter
        if (fromDate || toDate) {
            const dateFilter: DateRangeFilter = {};

            if (fromDate) dateFilter.$gte = new Date(fromDate);
            if (toDate) dateFilter.$lte = new Date(toDate);

            match.createdAt = dateFilter;
        }

        const skip = (page - 1) * limit;

        const [data, totalResult] = await Promise.all([

            TransactionModel.aggregate<SalesReportRowDTO>([

                { $match: match },

                {
                    $addFields: {
                        bookingObjectId: {
                            $toObjectId: "$metadata.bookingId"
                        }
                    }
                },
                {
                    $lookup: {
                        from: "bookings",
                        localField: "bookingObjectId",
                        foreignField: "_id",
                        as: "booking",
                    }
                },

                { $unwind: "$booking" },

                { $sort: { createdAt: -1 } },

                { $skip: skip },
                { $limit: limit },

                {
                    $project: {
                        date: { $toString: "$createdAt" },
                        bookingId: "$booking.bookingId",

                        grossAmount: "$booking.pricing.totalAmount",

                        netAmount: "$amount",

                        paymentStatus: "$booking.payment.paymentStatus",

                        commission: {
                            $subtract: [
                                "$booking.pricing.totalAmount",
                                "$amount",
                            ],
                        },
                    },
                },
            ]),

            TransactionModel.aggregate<{
                totalRevenue: number;
                totalBookings: number;
            }>([
                { $match: match },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: "$amount" },
                        totalBookings: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        totalRevenue: 1,
                        totalBookings: 1,
                    },
                },
            ]),
        ]);

        const summary = totalResult[0] ?? {
            totalRevenue: 0,
            totalBookings: 0,
        };

        return {
            data,
            summary,
            pagination: {
                page,
                limit,
                total: summary.totalBookings,
            },
        };
    };

    async groupSettlementByDate(walletId: string, range: SalesChartRequestDTO): Promise<SalesChartResponseDTO> {

        const { fromDate, toDate } = range;

        const match: SettlementMatch = {
            walletId: new Types.ObjectId(walletId),
            type: "CREDIT",
            reason: "SETTLEMENT",
            status: "SUCCESS",
        };

        // Date filter (dynamic)
        if (fromDate || toDate) {
            match.createdAt = {};

            if (fromDate) {
                match.createdAt.$gte = new Date(fromDate);
            }

            if (toDate) {
                match.createdAt.$lte = new Date(toDate);
            }
        }

        const result = await TransactionModel.aggregate<{
            date: string;
            revenue: number;
        }>([
            { $match: match },

            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    revenue: { $sum: "$amount" },
                },
            },

            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    revenue: 1,
                },
            },

            { $sort: { date: 1 } },
        ]);

        return { data: result };
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
    };


}
