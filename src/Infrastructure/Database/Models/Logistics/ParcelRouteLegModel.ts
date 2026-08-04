import { Schema, model, Document, Types } from "mongoose";

export type ParcelRouteLegStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED";

export interface ParcelRouteLegDocument extends Document {
    _id: Types.ObjectId;
    parcelRouteId: Schema.Types.ObjectId;
    segmentId: Schema.Types.ObjectId;
    legOrder: number;
    status: ParcelRouteLegStatus;
    shipmentId: Schema.Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}

const ParcelRouteLegSchema = new Schema<ParcelRouteLegDocument>(
    {
        parcelRouteId: {
            type: Schema.Types.ObjectId,
            ref: "ParcelRoute",
            required: true,
            index: true,
        },
        segmentId: {
            type: Schema.Types.ObjectId,
            ref: "RouteSegment",
            required: true,
        },
        legOrder: {
            type: Number,
            required: true,
            min: 1,
        },
        status: {
            type: String,
            enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "SKIPPED"],
            default: "PENDING",
            index: true,
        },
        shipmentId: {
            type: Schema.Types.ObjectId,
            ref: "HubShipment",
            default: null,
        },
    },
    { timestamps: true }
);

ParcelRouteLegSchema.index({ parcelRouteId: 1, legOrder: 1 });

ParcelRouteLegSchema.index({ segmentId: 1, status: 1 });

ParcelRouteLegSchema.index({ parcelRouteId: 1, status: 1 });

export const ParcelRouteLegModel = model<ParcelRouteLegDocument>("ParcelRouteLeg", ParcelRouteLegSchema);