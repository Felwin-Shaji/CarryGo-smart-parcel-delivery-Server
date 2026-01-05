import { Document, model, ObjectId, Schema } from "mongoose";

export interface PricingPolicySchemaType extends Document {
  _id: ObjectId;
  deliveryModel: "AGENCY" | "TRAVELER";
  minBasePrice: number;
  maxBasePrice: number;
  minPricePerKm: number;
  maxPricePerKm: number;
  minPricePerKg: number;
  maxPricePerKg: number;
  platformFeePercent: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PricingPolicySchema = new Schema<PricingPolicySchemaType>(
  {
    deliveryModel: {
      type: String,
      enum: ["AGENCY", "TRAVELER"],
      required: true,
      unique: true,
    },
    minBasePrice: { type: Number, required: true, min: 0 },
    maxBasePrice: { type: Number, required: true, min: 0 },
    minPricePerKm: { type: Number, required: true, min: 0 },
    maxPricePerKm: { type: Number, required: true, min: 0 },
    minPricePerKg: { type: Number, required: true, min: 0 },
    maxPricePerKg: { type: Number, required: true, min: 0 },

    platformFeePercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    isActive: {
      type: Boolean,
      default: true,
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
