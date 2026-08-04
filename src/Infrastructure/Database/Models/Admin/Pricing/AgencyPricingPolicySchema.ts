import { Schema } from 'mongoose';
import {BasePricingPolicySchemaType, PricingPolicyModel} from './BasePricingPolicySchema'

export interface AgencyPricingPolicySchemaType
  extends BasePricingPolicySchemaType {

  minBasePrice: number;
  maxBasePrice: number;

  minPricePerKm: number;
  maxPricePerKm: number;

  minPricePerKg: number;
  maxPricePerKg: number;
}

const AgencyPricingPolicySchema = new Schema<AgencyPricingPolicySchemaType>({
  minBasePrice: { type: Number, required: true, min: 0 },
  maxBasePrice: { type: Number, required: true, min: 0 },

  minPricePerKm: { type: Number, required: true, min: 0 },
  maxPricePerKm: { type: Number, required: true, min: 0 },

  minPricePerKg: { type: Number, required: true, min: 0 },
  maxPricePerKg: { type: Number, required: true, min: 0 },
});

export const AgencyPricingPolicyModel =
  PricingPolicyModel.discriminator(
    "AGENCY",
    AgencyPricingPolicySchema
  );
