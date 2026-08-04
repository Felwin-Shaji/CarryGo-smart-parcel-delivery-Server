import { Document, model, Schema, Types } from "mongoose";

export interface BasePricingPolicySchemaType extends Document {
    _id: Types.ObjectId;
    deliveryModel: "AGENCY" | "TRAVELER";

    platformFeePercent: number;
    isActive: boolean;
    policyVersion: number;

    createdAt?: Date;
    updatedAt?: Date;
}

const BasePricingPolicySchema = new Schema<BasePricingPolicySchemaType>(
    {
        deliveryModel: { type: String, required: true, enum: ["AGENCY", "TRAVELER"], index: true, },

        platformFeePercent: { type: Number, required: true, min: 0, max: 100, },

        isActive: { type: Boolean, default: true, index: true, },

        policyVersion: { type: Number, required: true, min: 1, },
    },
    {
        timestamps: true,
        versionKey: false,
        discriminatorKey: "deliveryModel",
    }
);

export const PricingPolicyModel = model<BasePricingPolicySchemaType>(
    "PricingPolicy",
    BasePricingPolicySchema
);
