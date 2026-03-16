import { Document, model, Schema, Types } from "mongoose";

export interface HubShipmentDocument extends Document {
    _id: Types.ObjectId;

    segmentId?: Types.ObjectId;

    type: "HUB_TRANSFER" | "OUT_FOR_DELIVERY" | "BULK_PICKUP";

    fromHubId?: Types.ObjectId;
    toHubId?: Types.ObjectId;

    assignedWorkerId?: Types.ObjectId;

    vehicleNumber?: string;

    capacity?: number;
    parcelCount: number;

    status:
    | "PENDING"
    | "LOADING"
    | "DISPATCHED"
    | "ARRIVED"
    | "COMPLETED"
    | "CANCELLED";

    departedAt?: Date;
    arrivedAt?: Date;

    createdAt: Date;
    updatedAt: Date;
};


const hubShipmentSchema = new Schema<HubShipmentDocument>(
    {
        segmentId: { type: Types.ObjectId, ref: "RouteSegment" },

        type: { type: String, enum: ["HUB_TRANSFER", "OUT_FOR_DELIVERY", "BULK_PICKUP"], required: true },

        fromHubId: { type: Types.ObjectId, ref: "Hub", index: true },
        toHubId: { type: Types.ObjectId, ref: "Hub", index: true },
        assignedWorkerId: { type: Types.ObjectId, ref: "HubWorker" },

        vehicleNumber: String,
        capacity: Number,

        parcelCount: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ["PENDING", "LOADING", "DISPATCHED", "ARRIVED", "COMPLETED", "CANCELLED"],
            default: "PENDING"
        },
        departedAt: Date,
        arrivedAt: Date
    },
    { timestamps: true }
);

export const HubShipmentModel = model<HubShipmentDocument>(
    "HubShipment",
    hubShipmentSchema
);

