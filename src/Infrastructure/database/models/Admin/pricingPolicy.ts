import { Document, model, ObjectId, Schema } from "mongoose";

export interface PricingPolicySchemaType extends Document {
  _id: ObjectId;

  deliveryModel: "AGENCY" | "TRAVELER";

  minBasePrice: number;
  maxBasePrice: number;

  minPricePerKm: number;
  maxPricePerKm: number;

  minSizePrice: number;
  maxSizePrice: number;

  platformFeePercent: number;

  isActive: boolean;
  policyVersion: number;

  createdAt?: Date;
  updatedAt?: Date;
}


const PricingPolicySchema = new Schema<PricingPolicySchemaType>(
  {
    deliveryModel: {
      type: String,
      enum: ["AGENCY", "TRAVELER"],
      required: true,
      index: true,
    },

    minBasePrice: { type: Number, required: true, min: 0 },
    maxBasePrice: { type: Number, required: true, min: 0 },

    minPricePerKm: { type: Number, required: true, min: 0 },
    maxPricePerKm: { type: Number, required: true, min: 0 },

    minSizePrice: { type: Number, required: true, min: 0 },
    maxSizePrice: { type: Number, required: true, min: 0 },

    platformFeePercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    policyVersion: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const PricingPolicyModel = model<PricingPolicySchemaType>(
  "PricingPolicy",
  PricingPolicySchema
);
