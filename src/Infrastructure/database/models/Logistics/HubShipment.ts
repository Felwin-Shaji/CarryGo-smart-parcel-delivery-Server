import { Document, model, Schema, Types } from "mongoose";
import { ShipmentStatus, ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";

export interface HubShipmentDocument extends Document {
    _id: Types.ObjectId;

    segmentId: Types.ObjectId | null;
    type: ShipmentType;

    fromHubId: Types.ObjectId | null;
    toHubId: Types.ObjectId | null;

    assignedWorkerId: Types.ObjectId | null;
    vehicleNumber: string | null;

    capacity: number | null;
    parcelCount: number;

    status: ShipmentStatus;

    departedAt: Date | null;
    arrivedAt: Date | null;

    createdAt: Date;
    updatedAt: Date;
}

const HubShipmentSchema = new Schema<HubShipmentDocument>(
    {
        segmentId: { type: Schema.Types.ObjectId, ref: "RouteSegment", default: null, index: true, },

        type: { type: String, enum: ["HUB_TRANSFER", "OUT_FOR_DELIVERY", "BULK_PICKUP"], required: true, index: true, },

        fromHubId: { type: Schema.Types.ObjectId, ref: "Hub", default: null, },
        toHubId: { type: Schema.Types.ObjectId, ref: "Hub", default: null, },

        assignedWorkerId: { type: Schema.Types.ObjectId, ref: "Worker", default: null, },

        vehicleNumber: { type: String, default: null, trim: true, },
        capacity: { type: Number, default: null, min: 0, },
        parcelCount: { type: Number, default: 0, min: 0, },

        status: {
            type: String,
            enum: ["PENDING", "LOADING", "DISPATCHED", "ARRIVED", "COMPLETED", "CANCELLED"],
            default: "PENDING",
            index: true,
        },
        departedAt: { type: Date, default: null, },
        arrivedAt: { type: Date, default: null, },
    },
    { timestamps: true }
);


HubShipmentSchema.index({ segmentId: 1, status: 1 });

HubShipmentSchema.index({ fromHubId: 1, status: 1 });

export const HubShipmentModel = model<HubShipmentDocument>("HubShipment", HubShipmentSchema);