import { Schema } from "mongoose";
import {
  BasePricingPolicySchemaType,
  PricingPolicyModel,
} from "./BasePricingPolicySchema";

export interface TravelerPricingPolicySchemaType
  extends BasePricingPolicySchemaType {

  basePrice: number;
  pricePerKm: number;

  basePricePerKg: number;

  transportMultipliers: Record<string, number>;
}

const TravelerPricingPolicySchema = new Schema<TravelerPricingPolicySchemaType>(
  {
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    pricePerKm: {
      type: Number,
      required: true,
      min: 0,
    },

    basePricePerKg: {
      type: Number,
      required: true,
      min: 0,
    },

    transportMultipliers: {
      type: Map,
      of: Number,
      required: true,
    },
  }
);

export const TravelerPricingPolicyModel =
  PricingPolicyModel.discriminator(
    "TRAVELER",
    TravelerPricingPolicySchema
  );