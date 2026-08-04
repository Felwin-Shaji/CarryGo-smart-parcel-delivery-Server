import { Document, model, Schema, Types } from "mongoose";

export interface RouteGroupDocument extends Document {
    _id: Types.ObjectId;
    agencyId: Types.ObjectId;

    name: string;
    description?: string;

    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const routeGroupSchema = new Schema<RouteGroupDocument>(
    {
        agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true, index: true },
        name: { type: String, required: true, trim: true },
        description: { type: String },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

export const RouteGroupModel = model<RouteGroupDocument>("RouteGroup", routeGroupSchema);