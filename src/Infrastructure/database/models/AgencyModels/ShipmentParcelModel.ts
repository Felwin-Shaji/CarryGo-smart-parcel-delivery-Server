import { Document, model, Schema, Types } from "mongoose";

export interface ShipmentParcelDocument extends Document {
    _id: Types.ObjectId;

    shipmentId: Types.ObjectId;
    bookingId: Types.ObjectId;

    status: "LOADED" | "IN_TRANSIT" | "UNLOADED";

    loadedAt: Date;
    unloadedAt?: Date;

    createdAt: Date;
    updatedAt: Date;
}

const shipmentParcelSchema = new Schema<ShipmentParcelDocument>(
    {
        shipmentId: { type: Schema.Types.ObjectId, ref: "HubShipment", required: true, index: true },
        bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
        status: { type: String, enum: ["LOADED", "IN_TRANSIT", "UNLOADED"], default: "LOADED" },
        loadedAt: { type: Date, default: Date.now },
        unloadedAt: Date
    },
    { timestamps: true }
);

shipmentParcelSchema.index(
    { shipmentId: 1, bookingId: 1 },
    { unique: true }
);

export const ShipmentParcelModel = model<ShipmentParcelDocument>(
    "ShipmentParcel",
    shipmentParcelSchema
);