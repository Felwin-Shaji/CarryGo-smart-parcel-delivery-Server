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

        let hubFilter: any = {};

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

        const filter: any = {};

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

        const filter: any = {
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
