import { Document, ObjectId, Schema, Types, model } from "mongoose";



export interface AgencyPricingSchemaType extends Document {
  _id: ObjectId;
  agencyId: Types.ObjectId;

  serviceType: "STANDARD" | "EXPRESS";

  basePrice: number;
  pricePerKm: number;
  pricePerKg: number;

  isActive: boolean;
  policyVersion: number;

  createdAt?: Date;
  updatedAt?: Date;
}




const AgencyPricingSchema = new Schema<AgencyPricingSchemaType>(
  {
    agencyId: {
      type: Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
      index: true,
    },

    serviceType: {
      type: String,
      enum: ["STANDARD", "EXPRESS"],
      required: true,
    },

    basePrice: { type: Number, required: true },
    pricePerKm: { type: Number, required: true },

    pricePerKg: { type: Number, required: true, min: 0 },

    isActive: { type: Boolean, default: true },

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

/* ---------- IMPORTANT CONSTRAINT ---------- */
AgencyPricingSchema.index(
  { agencyId: 1, serviceType: 1 },
  { unique: true }
);

export const AgencyPricingModel = model<AgencyPricingSchemaType>(
  "AgencyPricing",
  AgencyPricingSchema
);
