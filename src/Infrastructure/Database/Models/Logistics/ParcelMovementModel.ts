import { Document, model, Schema, Types } from "mongoose";

export interface ParcelMovementDocument extends Document {
    _id: Types.ObjectId;

    bookingId: Types.ObjectId;

    shipmentId?: Types.ObjectId;
    segmentId?: Types.ObjectId;

    fromHubId?: Types.ObjectId;
    toHubId?: Types.ObjectId;

    status:
    | "PENDING"
    | "LOADED"
    | "IN_TRANSIT"
    | "ARRIVED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED";

    loadedAt?: Date;
    unloadedAt?: Date;

    createdAt: Date;
    updatedAt: Date;
};

const parcelMovementSchema = new Schema<ParcelMovementDocument>(
    {
        bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
        shipmentId: { type: Types.ObjectId, ref: "HubShipment" },
        segmentId: { type: Types.ObjectId, ref: "RouteSegment" },

        fromHubId: { type: Types.ObjectId, ref: "Hub" },
        toHubId: { type: Types.ObjectId, ref: "Hub" },

        status: { type: String, enum: ["PENDING", "LOADED", "IN_TRANSIT", "ARRIVED", "OUT_FOR_DELIVERY", "DELIVERED"], required: true },

        loadedAt: Date,
        unloadedAt: Date
    },
    { timestamps: true }
)

export const ParcelMovementModel = model<ParcelMovementDocument>(
    "ParcelMovement",
    parcelMovementSchema
);