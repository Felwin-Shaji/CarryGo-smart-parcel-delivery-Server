import { ClientSession, Types } from "mongoose";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { ShipmentParcel } from "@/Domain/Entities/Logistics/ShipmentParcel";
import { ShipmentParcelDocument, ShipmentParcelModel } from "@/Infrastructure/database/models/Logistics/ShipmentParcelModel";

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
        if (!created) throw new Error("Failed to create ShipmentParcel");

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
        status: string,
        session?: ClientSession
    ): Promise<void> {
        await ShipmentParcelModel.updateMany(
            { _id: { $in: parcelIds.map((id) => new Types.ObjectId(id)) } },
            { $set: { status } }
        )
            .session(session || null);
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