import { Document, model, Schema, Types } from "mongoose";

export interface RouteSegmentDocument extends Document {
    _id: Types.ObjectId;

    agencyId: Types.ObjectId;
    routeGroupId: Types.ObjectId;

    originHubId: Types.ObjectId;
    destinationHubId: Types.ObjectId;

    segmentOrder: number;

    estimatedTimeMinutes?: number;
    distanceKm?: number;

    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
};

const routeSegmentSchema = new Schema<RouteSegmentDocument>(
    {
        agencyId:{ type: Schema.Types.ObjectId, ref: "agencies", required: true, index: true },
        routeGroupId: { type: Schema.Types.ObjectId, ref: "RouteGroup", required: true, index: true },
        originHubId: { type: Schema.Types.ObjectId, ref: "Hub", required: true, index: true },
        destinationHubId: { type: Schema.Types.ObjectId, ref: "Hub", required: true, index: true },
        segmentOrder: { type: Number, required: true },
        estimatedTimeMinutes: Number,
        distanceKm: Number,
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
)

routeSegmentSchema.index(
    { routeGroupId: 1, segmentOrder: 1 },
    { unique: true }
);

export const RouteSegmentModel = model<RouteSegmentDocument>(
    "RouteSegment",
    routeSegmentSchema
);