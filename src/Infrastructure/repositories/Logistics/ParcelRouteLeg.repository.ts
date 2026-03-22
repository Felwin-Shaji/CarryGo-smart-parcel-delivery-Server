import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { ParcelRouteLeg } from "@/Domain/Entities/Logistics/ParcelRouteLeg";
import { ParcelRouteLegDocument, ParcelRouteLegModel } from "@/Infrastructure/database/models/Logistics/ParcelRouteLegModel";
import { ClientSession, Types } from "mongoose";

export class ParcelRouteLegRepository implements IParcelRouteLegRepository {


    async saveMany(legs: ParcelRouteLeg[], session?: ClientSession): Promise<ParcelRouteLeg[]> {

        const docs = await ParcelRouteLegModel.insertMany(
            legs.map((leg) => ({
                parcelRouteId: new Types.ObjectId(leg.parcelRouteId),
                segmentId: new Types.ObjectId(leg.segmentId),
                legOrder: leg.legOrder,
                status: leg.status,
                shipmentId: leg.shipmentId ? new Types.ObjectId(leg.shipmentId) : null,
                createdAt: leg.createdAt,
                updatedAt: leg.updatedAt,
            })),
            { session: session ?? null }
        );

        return docs.map((doc) => this.toDomain(doc));
    }


    async findByRouteId(parcelRouteId: string, session?: ClientSession): Promise<ParcelRouteLeg[]> {

        const docs = await ParcelRouteLegModel
            .find({ parcelRouteId: new Types.ObjectId(parcelRouteId) })
            .sort({ legOrder: 1 })
            .session(session || null);

        return docs.map((doc) => this.toDomain(doc));
    }

    async updateShipmentId(legId: string, shipmentId: string, session?: ClientSession): Promise<void> {
        await ParcelRouteLegModel
            .findByIdAndUpdate(
                legId,
                { $set: { shipmentId: new Types.ObjectId(shipmentId) } },
                { new: true }
            )
            .session(session || null);
    }


    private toDomain(doc: ParcelRouteLegDocument): ParcelRouteLeg {
        return new ParcelRouteLeg(
            doc._id.toString(),
            doc.parcelRouteId.toString(),
            doc.segmentId.toString(),
            doc.legOrder,
            doc.status,
            doc.shipmentId ? doc.shipmentId.toString() : null,
            doc.createdAt,
            doc.updatedAt,
        );
    }
}