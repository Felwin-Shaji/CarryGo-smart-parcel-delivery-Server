import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { HubShipment } from "@/Domain/Entities/Logistics/HubShipment";
import { HubShipmentDocument, HubShipmentModel } from "@/Infrastructure/database/models/Logistics/HubShipmentModel";
import { UpdateQuery } from "mongoose";
import { ClientSession, Types } from "mongoose";
import { FilterQuery } from "mongoose";

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

    async findOpenShipmentForSegment(
        segmentId: string,
        session?: ClientSession
    ): Promise<HubShipment | null> {

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
            doc.departedAt ?? null,
            doc.arrivedAt ?? null,
            doc.createdAt,
            doc.updatedAt,
        );
    }
}