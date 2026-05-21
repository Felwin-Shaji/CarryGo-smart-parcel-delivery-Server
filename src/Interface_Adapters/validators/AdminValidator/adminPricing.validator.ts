import { z } from "zod";

/*
*********************************** transport multipliers
*/
const transportMultipliersSchema = z.object({
  FLIGHT: z.coerce.number().positive(),
  TRAIN: z.coerce.number().positive(),
  CAR: z.coerce.number().positive(),
  BUS: z.coerce.number().positive(),
  BIKE: z.coerce.number().positive(),
});

/*
*********************************** traveler pricing
*/
export const adminTravelerPricingSchema = z.object({
  body: z.object({

    basePrice: z.coerce.number().min(0),

    pricePerKm: z.coerce.number().min(0),

    basePricePerKg: z.coerce.number().min(0),

    transportMultipliers: transportMultipliersSchema,

    platformFeePercent: z.coerce
      .number()
      .min(0)
      .max(100),

  }),
});

/*
*********************************** agency pricing
*/
export const adminAgencyPricingSchema = z.object({
  body: z.object({

    deliveryModel: z
      .enum(["AGENCY", "TRAVELER"])
      .default("AGENCY"),

    minBasePrice: z.coerce.number().min(0),

    maxBasePrice: z.coerce.number().min(0),

    minPricePerKm: z.coerce.number().min(0),

    maxPricePerKm: z.coerce.number().min(0),

    minPricePerKg: z.coerce.number().min(0),

    maxPricePerKg: z.coerce.number().min(0),

    platformFeePercent: z.coerce
      .number()
      .min(0)
      .max(100),

    isActive: z
      .coerce
      .boolean()
      .default(true),

    policyVersion: z.coerce
      .number()
      .default(1),

  }),
});