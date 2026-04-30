import { ClientSession, Types, PipelineStage } from "mongoose";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { ShipmentParcel, ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";
import { ShipmentParcelDocument, ShipmentParcelModel } from "@/Infrastructure/database/models/Logistics/ShipmentParcelModel";
import { GetWorkerGraphRequestDTO, GetWorkerGraphResponseDTO, GetWorkerParcelsDTO, GetWorkerParcelsResponseDTO, WorkerGraphPointDTO, WorkerParcelItemDTO } from "@/Application/Dto/Workers/worker.dto";
import { ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";
import { AppError } from "@/Domain/utils/customError";
import { STATUS } from "@/Infrastructure/constants/statusCodes";

type WorkerParcelAggregationResult = {
    _id: Types.ObjectId;
    shipmentId: Types.ObjectId;
    bookingId: Types.ObjectId;

    status: ShipmentParcelStatus;
    shipmentType: ShipmentType;

    loadedAt: Date | null;
    unloadedAt: Date | null;

    createdAt: Date;
    updatedAt: Date;
};

type ParcelMatch = {
    status?: string;
    updatedAt?: {
        $gte?: Date;
        $lte?: Date;
    };
};

type GraphAggregationResult = {
    _id: {
        date: string;
    };
    count: number;
};

export class ShipmentParcelRepository implements IShipmentParcelRepository {

    async save(shipmentParcel: ShipmentParcel, session?: ClientSession): Promise<ShipmentParcel> {

        const createdDocs = await ShipmentParcelModel.create(
            [
                {
                    shipmentId: new Types.ObjectId(shipmentParcel.shipmentId),
                    bookingId: new Types.ObjectId(shipmentParcel.bookingId),
                    status: shipmentParcel.status,
                    loadedAt: shipmentParcel.loadedAt,
                    unloadedAt: shipmentParcel.unloadedAt,
                    createdAt: shipmentParcel.createdAt,
                    updatedAt: shipmentParcel.updatedAt,
                },
            ],
            { session }
        );

        const created = createdDocs[0];
        if (!created) throw new AppError("Failed to create ShipmentParcel", STATUS.NOT_IMPLEMENTED);

        return this.toDomain(created);
    }

    async findByIds(ids: string[], session?: ClientSession): Promise<ShipmentParcel[]> {
        const docs = await ShipmentParcelModel
            .find({ _id: { $in: ids.map((id) => new Types.ObjectId(id)) } })
            .session(session || null);

        return docs.map((doc) => this.toDomain(doc));
    }

    async findByShipmentId(shipmentId: string, session?: ClientSession): Promise<ShipmentParcel[]> {

        const docs = await ShipmentParcelModel
            .find({ shipmentId: new Types.ObjectId(shipmentId) })
            .session(session || null);

        return docs.map((doc) => this.toDomain(doc));
    }

    async findByBookingId(bookingId: string, session?: ClientSession): Promise<ShipmentParcel[]> {

        const docs = await ShipmentParcelModel
            .find({ bookingId: new Types.ObjectId(bookingId) })
            .session(session || null);

        return docs.map((doc) => this.toDomain(doc));
    }

    async updateStatus(
        shipmentParcelId: string,
        status: string,
        session?: ClientSession
    ): Promise<void> {

        await ShipmentParcelModel
            .findByIdAndUpdate(
                shipmentParcelId,
                { $set: { status } },
                { new: true }
            )
            .session(session || null);
    }

    async bulkUpdateStatus(
        parcelIds: string[],
        status: ShipmentParcelStatus,
        session?: ClientSession
    ): Promise<void> {

        const updateFields: Partial<{
            status: ShipmentParcelStatus;
            updatedAt: Date;
            loadedAt: Date;
            unloadedAt: Date;
        }> = {
            status,
            updatedAt: new Date(),
        };

        if (status === "LOADED") {
            updateFields.loadedAt = new Date();
        }

        if (status === "UNLOADED") {
            updateFields.unloadedAt = new Date();
        }

        await ShipmentParcelModel.updateMany(
            {
                _id: { $in: parcelIds.map(id => new Types.ObjectId(id)) }
            },
            {
                $set: updateFields
            }
        ).session(session || null);
    }

    async findByShipmentIdPaginated(shipmentId: string, page: number, limit: number, session?: ClientSession): Promise<{ parcels: ShipmentParcel[]; total: number; }> {
        const skip = (page - 1) * limit;

        const query = { shipmentId };

        const [parcelDocs, total] = await Promise.all([
            ShipmentParcelModel.find(query)
                .skip(skip)
                .limit(limit)
                .session(session || null),

            ShipmentParcelModel.countDocuments(query).session(session || null),
        ]);

        const parcles = parcelDocs.map((doc) => this.toDomain(doc as ShipmentParcelDocument));

        return { parcels: parcles, total };
    }

    async getWorkerParcels(workerId: string, dto: GetWorkerParcelsDTO): Promise<GetWorkerParcelsResponseDTO> {
        const { page, limit, status, fromDate, toDate } = dto;
        const skip = (page - 1) * limit;

        const workerObjectId = new Types.ObjectId(workerId);

        const match: Partial<{
            status: ShipmentParcelStatus;
            updatedAt: {
                $gte?: Date;
                $lte?: Date;
            };
        }> = {};

        if (status) {
            match.status = status;
        };

        if (fromDate || toDate) {
            match.updatedAt = {};
            if (fromDate) match.updatedAt.$gte = new Date(fromDate);
            if (toDate) match.updatedAt.$lte = new Date(toDate);
        };


        const pipeline: PipelineStage[] = [
            // Join Shipment
            {
                $lookup: {
                    from: "hubshipments",
                    localField: "shipmentId",
                    foreignField: "_id",
                    as: "shipment",
                },
            },
            { $unwind: "$shipment" },

            // Filter by worker
            {
                $match: {
                    "shipment.assignedWorkerId": workerObjectId,
                    ...match,
                },
            },

            // Join Booking (IMPORTANT)
            {
                $lookup: {
                    from: "bookings",
                    localField: "bookingId",
                    foreignField: "_id",
                    as: "booking",
                },
            },
            { $unwind: "$booking" },

            // Project only needed fields (VERY IMPORTANT)
            {
                $project: {
                    _id: 1,
                    shipmentId: 1,

                    bookingId: "$booking.bookingId",

                    status: 1,
                    loadedAt: 1,
                    unloadedAt: 1,
                    createdAt: 1,
                    updatedAt: 1,

                    shipmentType: "$shipment.type",
                },
            },

            { $sort: { updatedAt: -1 } },

            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    totalCount: [{ $count: "count" }],
                },
            },
        ];

        const result = await ShipmentParcelModel.aggregate<{
            data: WorkerParcelAggregationResult[];
            totalCount: { count: number }[];
        }>(pipeline);


        const parcelsDocs = result[0]?.data ?? [];
        const total = result[0]?.totalCount[0]?.count ?? 0;

        const parcels: WorkerParcelItemDTO[] = parcelsDocs.map((doc) => ({
            id: doc._id.toString(),
            shipmentId: doc.shipmentId.toString(),
            bookingId: doc.bookingId.toString(),

            status: doc.status,

            loadedAt: doc.loadedAt,
            unloadedAt: doc.unloadedAt,

            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,

            shipmentType: doc.shipmentType,
        }));

        return {
            data: parcels,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };

    };

    async countByStatus(workerId: string, status: string): Promise<number> {
        return await ShipmentParcelModel.countDocuments({
            assignedWorkerId: workerId,
            status,
        });
    };


    async countByShipment(shipmentId: string): Promise<number> {
        return await ShipmentParcelModel.countDocuments({
            shipmentId,
        });
    }

    async countByStatusForWorker(workerId: string, status: ShipmentParcelStatus): Promise<number> {

        const workerObjectId = new Types.ObjectId(workerId);

        const result = await ShipmentParcelModel.aggregate([
            {
                $lookup: {
                    from: "hubshipments",
                    localField: "shipmentId",
                    foreignField: "_id",
                    as: "shipment"
                }
            },
            { $unwind: "$shipment" },
            {
                $match: {
                    "shipment.assignedWorkerId": workerObjectId,
                    status: status
                }
            },
            {
                $count: "count"
            }
        ]);

        return result[0]?.count || 0;
    }

    async countPendingForWorker(workerId: string): Promise<number> {

        const workerObjectId = new Types.ObjectId(workerId);


        const result = await ShipmentParcelModel.aggregate([
            {
                $lookup: {
                    from: "hubshipments",
                    localField: "shipmentId",
                    foreignField: "_id",
                    as: "shipment"
                }
            },
            { $unwind: "$shipment" },
            {
                $match: {
                    "shipment.assignedWorkerId": workerObjectId,
                    status: { $ne: "UNLOADED" }
                }
            },
            {
                $count: "count"
            }
        ]);

        return result[0]?.count || 0;
    }

    async countTodayForWorker(workerId: string, date: Date): Promise<number> {

        const workerObjectId = new Types.ObjectId(workerId);

        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const result = await ShipmentParcelModel.aggregate([
            {
                $lookup: {
                    from: "hubshipments",
                    localField: "shipmentId",
                    foreignField: "_id",
                    as: "shipment"
                }
            },
            { $unwind: "$shipment" },
            {
                $match: {
                    "shipment.assignedWorkerId": workerObjectId,
                    updatedAt: { $gte: start, $lte: end }
                }
            },
            {
                $count: "count"
            }
        ]);

        return result[0]?.count || 0;
    };

    async getGraphDataForWorker(workerId: string, filters: GetWorkerGraphRequestDTO): Promise<GetWorkerGraphResponseDTO> {

        const workerObjectId = new Types.ObjectId(workerId);

        const match: ParcelMatch = {};

        // Status filter
        if (filters.status) {
            match.status = filters.status;
        }

        // Date filter
        if (filters.fromDate || filters.toDate) {
            match.updatedAt = {};

            if (filters.fromDate) {
                match.updatedAt.$gte = new Date(filters.fromDate);
            }

            if (filters.toDate) {
                const end = new Date(filters.toDate);
                end.setHours(23, 59, 59, 999);
                match.updatedAt.$lte = end;
            }
        }

        const result = await ShipmentParcelModel.aggregate<GraphAggregationResult>([
            {
                $lookup: {
                    from: "hubshipments",
                    localField: "shipmentId",
                    foreignField: "_id",
                    as: "shipment",
                },
            },
            { $unwind: "$shipment" },

            {
                $match: {
                    ...match,
                    "shipment.assignedWorkerId": workerObjectId,
                },
            },

            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$updatedAt",
                            },
                        },
                    },
                    count: { $sum: 1 },
                },
            },

            {
                $sort: { "_id.date": 1 },
            },
        ]);

        const series: WorkerGraphPointDTO[] = result.map((item) => ({
            date: item._id.date,
            count: item.count,
        }));

        return { series };
    }

    private toDomain(doc: ShipmentParcelDocument): ShipmentParcel {
        return new ShipmentParcel(
            doc._id.toString(),
            doc.shipmentId.toString(),
            doc.bookingId.toString(),
            doc.status,
            doc.loadedAt,
            doc.unloadedAt ?? null,
            doc.createdAt,
            doc.updatedAt,
        );
    }
}