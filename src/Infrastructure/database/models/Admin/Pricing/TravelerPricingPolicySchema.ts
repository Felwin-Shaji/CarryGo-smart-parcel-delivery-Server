import { Schema } from 'mongoose';
import {BasePricingPolicySchemaType, PricingPolicyModel} from './BasePricingPolicySchema'

export interface TravelerPricingPolicySchemaType
  extends BasePricingPolicySchemaType {

  basePricePerKg: number;

  flightMultiplier: number;
  trainMultiplier: number;
  carMultiplier: number;
  busMultiplier: number;
  bikeMultiplier: number;
}

const TravelerPricingPolicySchema = new Schema<TravelerPricingPolicySchemaType>({
  basePricePerKg: { type: Number, required: true, min: 0 },

  flightMultiplier: { type: Number, required: true },
  trainMultiplier: { type: Number, required: true },
  carMultiplier: { type: Number, required: true },
  busMultiplier: { type: Number, required: true },
  bikeMultiplier: { type: Number, required: true },
});

export const TravelerPricingPolicyModel =
  PricingPolicyModel.discriminator(
    "TRAVELER",
    TravelerPricingPolicySchema
  );
