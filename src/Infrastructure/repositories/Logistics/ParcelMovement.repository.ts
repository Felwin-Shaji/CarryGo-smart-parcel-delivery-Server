
import { ClientSession, Types } from "mongoose";
import { IParcelMovementRepository } from "../../../Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { ParcelMovement } from "../../../Domain/Entities/Booking/ParcelMovement";
import { ParcelMovementDocument, ParcelMovementModel } from "../../database/models/Logistics/ParcelMovementModel";
import { AppError } from "../../../Domain/utils/customError";
import { PARCEL_MOVEMENT_MESSAGE } from "../../constants/messages/RouteGroupMessage";
import { STATUS } from "../../constants/statusCodes";

export class ParcelMovementRepository implements IParcelMovementRepository {
    constructor() { };

    async save(movement: ParcelMovement, session?: ClientSession): Promise<ParcelMovement> {

        const createdDocs = await ParcelMovementModel.create(
            [
                {
                    bookingId: new Types.ObjectId(movement.bookingId),
                    shipmentId: movement.shipmentId ? new Types.ObjectId(movement.shipmentId) : null,
                    segmentId: movement.segmentId ? new Types.ObjectId(movement.segmentId) : null,
                    fromHubId: movement.fromHubId ? new Types.ObjectId(movement.fromHubId) : null,
                    toHubId: movement.toHubId ? new Types.ObjectId(movement.toHubId) : null,
                    status: movement.status,
                    loadedAt: movement.loadedAt,
                    unloadedAt: movement.unloadedAt,
                    createdAt: movement.createdAt,
                    updatedAt: movement.updatedAt,
                },
            ],
            { session }
        );

        const created = createdDocs[0];
        if (!created) throw new AppError(PARCEL_MOVEMENT_MESSAGE.CREATION_FAILED, STATUS.METHOD_NOT_ALLOWED);

        return this.toDomain(created);
    };

    async findByBookingId(bookingId: string, session?: ClientSession): Promise<ParcelMovement[]> {
        const docs = await ParcelMovementModel.find({ bookingId: new Types.ObjectId(bookingId) })
            .sort({ createdAt: 1 })
            .session(session || null);

        return docs.map((doc) => this.toDomain(doc));
    }

    private toDomain(doc: ParcelMovementDocument): ParcelMovement {
        return new ParcelMovement(
            doc._id.toString(),
            doc.bookingId.toString(),
            doc.shipmentId ? doc.shipmentId.toString() : null,
            doc.segmentId ? doc.segmentId.toString() : null,
            doc.fromHubId ? doc.fromHubId.toString() : null,
            doc.toHubId ? doc.toHubId.toString() : null,
            doc.status,
            doc.loadedAt ?? null,
            doc.unloadedAt ?? null,
            doc.createdAt,
            doc.updatedAt,
        )
    }
}  