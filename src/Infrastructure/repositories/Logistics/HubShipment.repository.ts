import { ShipmentSummaryGroup } from "@/Application/Dto/Hub/hubDashboar.dto";
import { GetShipmentsDTO, GetWorkerShipmentDTO } from "@/Application/Dto/Logistics/shipment.dto";
import { HubShipmentPaginatedData, IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { HubShipment, ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";
import { HubShipmentDocument, HubShipmentModel } from "@/Infrastructure/database/models/Logistics/HubShipmentModel";
import { UpdateQuery } from "mongoose";
import { ClientSession, Types } from "mongoose";
import { FilterQuery } from "mongoose";

type PopulatedWorker = {
    _id: Types.ObjectId;
    name: string;
};

function isPopulatedWorker(worker: unknown): worker is PopulatedWorker {
    if (typeof worker !== "object" || worker === null) return false;

    const w = worker as Record<string, unknown>;

    return (
        "_id" in w &&
        "name" in w &&
        typeof w.name === "string"
    );
}

export class HubShipmentRepository implements IHubShipmentRepository {

    async find(filter: FilterQuery<HubShipment>, session?: ClientSession): Promise<HubShipment[]> {
        const docs = await HubShipmentModel
            .find(filter)
            .session(session || null);
        return docs.map((doc) => this.toDomain(doc));
    };

    async findById(filter: FilterQuery<HubShipment>, session?: ClientSession): Promise<HubShipment | null> {
        const doc = await HubShipmentModel
            .findOne(filter)
            .session(session || null);
        return doc ? this.toDomain(doc) : null;
    }

    async findOne(filter: FilterQuery<HubShipment>, session?: ClientSession): Promise<HubShipment | null> {
        const doc = await HubShipmentModel
            .findOne(filter)
            .session(session || null);
        return doc ? this.toDomain(doc) : null;
    }

    async save(data: HubShipment, session?: ClientSession): Promise<HubShipment> {
        const createdDocs = await HubShipmentModel.create(
            [
                {
                    segmentId: data.segmentId ? new Types.ObjectId(data.segmentId) : null,
                    type: data.type,
                    fromHubId: data.fromHubId ? new Types.ObjectId(data.fromHubId) : null,
                    toHubId: data.toHubId ? new Types.ObjectId(data.toHubId) : null,
                    assignedWorkerId: data.assignedWorkerId ? new Types.ObjectId(data.assignedWorkerId) : null,
                    vehicleNumber: data.vehicleNumber,
                    capacity: data.capacity,
                    parcelCount: data.parcelCount,
                    status: data.status,
                    departedAt: data.departedAt,
                    arrivedAt: data.arrivedAt,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                },
            ],
            { session }
        );

        const created = createdDocs[0];
        if (!created) throw new Error("Failed to create HubShipment");

        return this.toDomain(created);
    };

    async findOneAndUpdate(
        filter: FilterQuery<HubShipment>,
        value: object,
        unset?: object,
        session?: ClientSession
    ): Promise<HubShipment | null> {

        if (filter._id && typeof filter._id === "string") {
            filter._id = new Types.ObjectId(filter._id);
        }


        const updateQuery: UpdateQuery<HubShipmentDocument> = { $set: value };
        if (unset) updateQuery.$unset = unset;

        const doc = await HubShipmentModel
            .findOneAndUpdate(filter, updateQuery, { new: true })
            .session(session || null);

        return doc ? this.toDomain(doc) : null;
    }

    async delete(filter: FilterQuery<HubShipment>, session?: ClientSession): Promise<HubShipment | null> {
        const doc = await HubShipmentModel
            .findOneAndDelete(filter)
            .session(session || null);
        return doc ? this.toDomain(doc) : null;
    }

    async findOpenShipmentForSegment(segmentId: string, session?: ClientSession): Promise<HubShipment | null> {

        const doc = await HubShipmentModel
            .findOne({
                segmentId: new Types.ObjectId(segmentId),
                status: "PENDING",
                $or: [
                    { capacity: null },
                    { $expr: { $lt: ["$parcelCount", "$capacity"] } },
                ],
            })
            .session(session || null);

        return doc ? this.toDomain(doc) : null;
    }

    async findOpenShipmentByHubAndType(hubId: string, type: ShipmentType, session?: ClientSession): Promise<HubShipment | null> {

        let hubFilter: FilterQuery<HubShipmentDocument>;

        if (type === "BULK_PICKUP") {
            hubFilter = { toHubId: new Types.ObjectId(hubId) };
        } else if (type === "OUT_FOR_DELIVERY") {
            hubFilter = { fromHubId: new Types.ObjectId(hubId) };
        } else {
            throw new Error("findOpenShipmentByHubAndType is not valid for HUB_TRANSFER");
        }

        const doc = await HubShipmentModel
            .findOne({
                type,
                ...hubFilter,
                status: { $in: ["PENDING", "LOADING"] },
                $or: [
                    { capacity: null },
                    { $expr: { $lt: ["$parcelCount", "$capacity"] } },
                ],
            })
            .sort({ parcelCount: 1 })
            .session(session || null);

        return doc ? this.toDomain(doc) : null;
    }

    async getPaginatedShipments(hubId: string, dto: GetShipmentsDTO): Promise<HubShipmentPaginatedData> {

        const { page = 1, limit = 10, search, type, status, workerId, fromDate, toDate, } = dto;

        const skip = (page - 1) * limit;

        const filter: FilterQuery<HubShipmentDocument> = {};

        if (type) filter.type = type;

        if (hubId) {
            if (type === "BULK_PICKUP") {
                filter.toHubId = new Types.ObjectId(hubId);
            } else if (type === "OUT_FOR_DELIVERY") {
                filter.fromHubId = new Types.ObjectId(hubId);
            } else if (type === "HUB_TRANSFER") {
                filter.$or = [
                    { fromHubId: new Types.ObjectId(hubId) },
                    { toHubId: new Types.ObjectId(hubId) },
                ];
            }
        }

        if (status) filter.status = status;


        if (workerId) filter.assignedWorkerId = new Types.ObjectId(workerId);


        if (search) {
            const searchFilter = {
                $or: [
                    { vehicleNumber: { $regex: search, $options: "i" } },
                    { _id: { $regex: search, $options: "i" } },
                ],
            };

            if (filter.$or) {
                filter.$and = [
                    { $or: filter.$or },
                    searchFilter
                ];
                delete filter.$or;
            } else {
                Object.assign(filter, searchFilter);
            }
        }

        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const [docs, total] = await Promise.all([
            HubShipmentModel
                .find(filter)
                .populate("assignedWorkerId", "name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            HubShipmentModel.countDocuments(filter),
        ]);



        return {
            data: docs.map((doc) => {
                const shipment = this.toDomain(doc) as HubShipment & { assignedWorkerName?: string | null };

                const worker = doc.assignedWorkerId;

                if (isPopulatedWorker(worker)) {
                    shipment.assignedWorkerName = worker.name;
                } else {
                    shipment.assignedWorkerName = null;
                }

                return shipment;
            }),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getPaginatedShipmentsForWorker(workerId: string, dto: GetWorkerShipmentDTO): Promise<HubShipmentPaginatedData> {

        const { page = 1, limit = 10, type, status, search, fromDate, toDate } = dto;

        const skip = (page - 1) * limit;

        const filter: FilterQuery<HubShipmentDocument> = {
            assignedWorkerId: workerId,
        };

        if (type) filter.type = type;
        if (status) filter.status = status;

        if (search) {
            filter._id = { $regex: search, $options: "i" };
        }

        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const [docs, total] = await Promise.all([
            HubShipmentModel.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            HubShipmentModel.countDocuments(filter),
        ]);

        return {
            data: docs.map((doc) => this.toDomain(doc)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findByIds(ids: string[], session?: ClientSession): Promise<HubShipment[]> {
        const objectIds = ids.map((id) => new Types.ObjectId(id));
        const docs = await HubShipmentModel
            .find({ _id: { $in: objectIds } })
            .session(session || null);
        return docs.map((doc) => this.toDomain(doc));
    }

    async findActiveByWorker(workerId: string): Promise<HubShipment | null> {

        const doc = await HubShipmentModel.findOne({
            assignedWorkerId: workerId,
            status: { $in: ["PENDING", "LOADING", "DISPATCHED", "ARRIVED"] }
        });

        if (!doc) return null;

        return this.toDomain(doc);
    }

    async countCompleted(workerId: string): Promise<number> {
        return await HubShipmentModel.countDocuments({
            assignedWorkerId: workerId,
            status: "COMPLETED",
        });
    };

    async countToday(workerId: string, date: Date): Promise<number> {

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return await HubShipmentModel.countDocuments({
            assignedWorkerId: workerId,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });
    };

    async getShipmentSummary(
        hubId: string,
    ): Promise<{
        total: number;
        pending: number;
        active: number;
        arrived: number;
        completed: number;
        cancelled: number;
    }> {

        const hubObjectId = new Types.ObjectId(hubId);

        const match: FilterQuery<HubShipmentDocument> = {
            $or: [
                { fromHubId: hubObjectId },
                { toHubId: hubObjectId },
            ],
        };


        const result = await HubShipmentModel.aggregate<ShipmentSummaryGroup>([
            { $match: match },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const summary = {
            total: 0,
            pending: 0,
            active: 0,
            arrived: 0,
            completed: 0,
            cancelled: 0,
        };
        for (const item of result) {
            summary.total += item.count;

            switch (item._id) {
                case "PENDING":
                    summary.pending = item.count;
                    break;

                case "LOADING":
                case "DISPATCHED":
                    summary.active += item.count;
                    break;

                case "ARRIVED":
                    summary.arrived = item.count;
                    break;

                case "COMPLETED":
                    summary.completed = item.count;
                    break;

                case "CANCELLED":
                    summary.cancelled = item.count;
                    break;
            }
        }

        return summary;
    };

    async getShipmentTrend(
        hubId: string,
        from?: string,
        to?: string
    ): Promise<{ date: string; count: number }[]> {

        const hubObjectId = new Types.ObjectId(hubId);

        const match: FilterQuery<HubShipmentDocument> = {
            $or: [
                { fromHubId: hubObjectId },
                { toHubId: hubObjectId },
            ],
        };

        if (from || to) {
            match.createdAt = {
                ...(from && { $gte: new Date(from) }),
                ...(to && { $lte: new Date(to) }),
            };
        }

        const result = await HubShipmentModel.aggregate<{
            _id: string;
            count: number;
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
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        return result.map((item) => ({
            date: item._id,
            count: item.count,
        }));
    };

    async getShipmentTypes(
        hubId: string
    ): Promise<{
        hubTransfer: number;
        outForDelivery: number;
        bulkPickup: number;
    }> {

        const hubObjectId = new Types.ObjectId(hubId);

        const result = await HubShipmentModel.aggregate<{
            _id: "HUB_TRANSFER" | "OUT_FOR_DELIVERY" | "BULK_PICKUP";
            count: number;
        }>([
            {
                $match: {
                    $or: [
                        { fromHubId: hubObjectId },
                        { toHubId: hubObjectId },
                    ],
                },
            },
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 },
                },
            },
        ]);

        const types = {
            hubTransfer: 0,
            outForDelivery: 0,
            bulkPickup: 0,
        };

        for (const item of result) {
            switch (item._id) {
                case "HUB_TRANSFER":
                    types.hubTransfer = item.count;
                    break;
                case "OUT_FOR_DELIVERY":
                    types.outForDelivery = item.count;
                    break;
                case "BULK_PICKUP":
                    types.bulkPickup = item.count;
                    break;
            }
        }

        return types;
    };


    async findRecentShipmentsByHub(
        hubId: string,
        limit: number
    ): Promise<HubShipment[]> {
        const hubObjectId = new Types.ObjectId(hubId);

        const query: FilterQuery<HubShipmentDocument> = {
            $or: [
                { fromHubId: hubObjectId },
                { toHubId: hubObjectId },
            ],
        };

        const docs = await HubShipmentModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        return docs.map((doc) => this.toDomain(doc));
    };

    async findUnassignedShipmentsByHub(
        hubId: string,
        limit: number
    ): Promise<HubShipment[]> {
        const hubObjectId = new Types.ObjectId(hubId);

        const query: FilterQuery<HubShipmentDocument> = {
            $or: [
                { fromHubId: hubObjectId },
                { toHubId: hubObjectId },
            ],
            assignedWorkerId: null,
        };

        const docs = await HubShipmentModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        return docs.map((doc) => this.toDomain(doc));
    }

    private toDomain(doc: HubShipmentDocument): HubShipment {
        return new HubShipment(
            doc._id.toString(),
            doc.segmentId ? doc.segmentId.toString() : null,
            doc.type,
            doc.fromHubId ? doc.fromHubId.toString() : null,
            doc.toHubId ? doc.toHubId.toString() : null,
            doc.assignedWorkerId ? doc.assignedWorkerId.toString() : null,
            doc.vehicleNumber ?? null,
            doc.capacity ?? null,
            doc.parcelCount,
            doc.status,
            doc.estimatedDispatchAt ?? null,
            doc.departedAt ?? null,
            doc.arrivedAt ?? null,
            doc.createdAt,
            doc.updatedAt,
        );
    }
}
