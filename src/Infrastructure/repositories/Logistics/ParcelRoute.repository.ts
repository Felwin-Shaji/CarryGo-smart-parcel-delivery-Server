import { IParcelRouteRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteRepository";
import { ParcelRoute } from "@/Domain/Entities/Logistics/ParcelRoute";
import { AppError } from "@/Domain/utils/customError";
import { ParcelRouteDocument, ParcelRouteModel } from "@/Infrastructure/database/models/Logistics/ParcelRouteModel";
import { ClientSession, Types } from "mongoose";

export class ParcelRouteRepository implements IParcelRouteRepository {
    /**
 * Persist a new ParcelRoute document.
 */
    async save(parcelRoute: ParcelRoute, session?: ClientSession): Promise<ParcelRoute> {

        const createdDocs = await ParcelRouteModel.create(
            [
                {
                    bookingId: new Types.ObjectId(parcelRoute.bookingId),
                    status: parcelRoute.status,
                    createdAt: parcelRoute.createdAt,
                    updatedAt: parcelRoute.updatedAt,
                },
            ],
            { session }
        );

        const created = createdDocs[0];

        if (!created) {
            throw new Error("Failed to create ParcelRoute");
        }

        return this.toDomain(created);
    }

    async findByBookingId(bookingId: string, session?: ClientSession): Promise<ParcelRoute | null> {

        const doc = await ParcelRouteModel
            .findOne({ bookingId: new Types.ObjectId(bookingId) })
            .session(session || null);

        return doc ? this.toDomain(doc) : null;
    }

    async findById(id: string, session?: ClientSession): Promise<ParcelRoute> {
        const doc = await ParcelRouteModel
            .findById(id)
            .session(session || null);

        if (!doc) {
            throw new AppError("canot find parselRoute by id")
        }

        return this.toDomain(doc)
    }

    async update(parcelRoute: ParcelRoute, session?: ClientSession): Promise<void> {
        await ParcelRouteModel.findByIdAndUpdate(
            parcelRoute.id!,
            {
                $set: {
                    bookingId: new Types.ObjectId(parcelRoute.bookingId),
                    status: parcelRoute.status,
                    updatedAt: parcelRoute.updatedAt,
                },
            },
        )
            .session(session || null);
    }


    private toDomain(doc: ParcelRouteDocument): ParcelRoute {
        return new ParcelRoute(
            doc._id.toString(),
            doc.bookingId.toString(),
            doc.status,
            doc.createdAt,
            doc.updatedAt,
        );
    }


}