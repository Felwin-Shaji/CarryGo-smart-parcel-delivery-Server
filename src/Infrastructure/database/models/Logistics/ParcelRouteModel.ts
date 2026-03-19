import { Schema, model, Document, Types } from "mongoose";

export type ParcelRouteStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

export interface ParcelRouteDocument extends Document {
    _id: Types.ObjectId;
    bookingId: Schema.Types.ObjectId;
    status: ParcelRouteStatus;
    createdAt: Date;
    updatedAt: Date;
}

const ParcelRouteSchema = new Schema<ParcelRouteDocument>(
    {
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
            unique: true, // one route per booking
            index: true,
        },
        status: {
            type: String,
            enum: ["PLANNED", "IN_PROGRESS", "COMPLETED", "FAILED"],
            default: "PLANNED",
            index: true,
        },
    },
    { timestamps: true }
);

export const ParcelRouteModel = model<ParcelRouteDocument>("ParcelRoute", ParcelRouteSchema);