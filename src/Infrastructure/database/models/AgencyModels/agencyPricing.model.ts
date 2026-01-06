import { Document, ObjectId, Schema, Types, model } from "mongoose";

export interface SizePricingSchemaType {
  price: number;
}

export interface AgencyPricingSchemaType extends Document {
  _id: ObjectId;
  agencyId: Types.ObjectId;

  serviceType: "STANDARD" | "EXPRESS";

  basePrice: number;
  pricePerKm: number;

  sizePricing: {
    SMALL: SizePricingSchemaType;
    MEDIUM: SizePricingSchemaType;
    LARGE: SizePricingSchemaType;
  };

  isActive: boolean;
  policyVersion: number;

  createdAt?: Date;
  updatedAt?: Date;
}



const SizePricingSchema = new Schema(
  {
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);


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

    sizePricing: {
      SMALL: { type: SizePricingSchema, required: true },
      MEDIUM: { type: SizePricingSchema, required: true },
      LARGE: { type: SizePricingSchema, required: true },
    },

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
