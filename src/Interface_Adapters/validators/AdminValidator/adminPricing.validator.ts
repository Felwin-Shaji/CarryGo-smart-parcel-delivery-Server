import { z } from "zod";

/*
*********************************** transport multipliers
*/
const transportMultipliersSchema = z
  .object({
    FLIGHT: z.coerce.number().positive("FLIGHT multiplier must be > 0"),
    TRAIN: z.coerce.number().positive("TRAIN multiplier must be > 0"),
    CAR: z.coerce.number().positive("CAR multiplier must be > 0"),
    BUS: z.coerce.number().positive("BUS multiplier must be > 0"),
    BIKE: z.coerce.number().positive("BIKE multiplier must be > 0"),
  })
  .strict();

/*
*********************************** main schema
*/
export const adminTravelerPricingBodySchema = z
  .object({
    basePrice: z.coerce
      .number()
      .min(0, "Base price cannot be negative"),

    pricePerKm: z.coerce
      .number()
      .min(0, "Price per km cannot be negative"),

    basePricePerKg: z.coerce
      .number()
      .min(0, "Base price per kg cannot be negative"),

    transportMultipliers: transportMultipliersSchema,

    platformFeePercent: z.coerce
      .number()
      .min(0, "Platform fee cannot be negative")
      .max(100, "Platform fee cannot exceed 100%"),
  })
  .strict()
  .superRefine((data, ctx) => {
    // 🚫 avoid useless pricing config
    if (
      data.basePrice === 0 &&
      data.pricePerKm === 0 &&
      data.basePricePerKg === 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "At least one pricing component must be greater than 0",
        path: ["basePrice"],
      });
    }
  });

export const adminTravelerPricingSchema = z.object({
  body: adminTravelerPricingBodySchema,
});

/*
*********************************** admin agency pricing
*/
export const adminAgencyPricingBodySchema = z
  .object({
    deliveryModel: z.enum(["AGENCY", "TRAVELER"]),

    minBasePrice: z.coerce.number().min(0),
    maxBasePrice: z.coerce.number().min(0),

    minPricePerKm: z.coerce.number().min(0),
    maxPricePerKm: z.coerce.number().min(0),

    minPricePerKg: z.coerce.number().min(0),
    maxPricePerKg: z.coerce.number().min(0),

    platformFeePercent: z.coerce
      .number()
      .min(0, "Platform fee cannot be negative")
      .max(100, "Platform fee cannot exceed 100"),

    isActive: z.boolean(),

    policyVersion: z.coerce
      .number()
      .int("Policy version must be an integer")
      .min(1, "Policy version must be at least 1"),
  })
  .strict()
  .superRefine((data, ctx) => {
    // 🔥 range validations
    if (data.minBasePrice > data.maxBasePrice) {
      ctx.addIssue({
        code: "custom",
        message: "minBasePrice cannot be greater than maxBasePrice",
        path: ["minBasePrice"],
      });
    }

    if (data.minPricePerKm > data.maxPricePerKm) {
      ctx.addIssue({
        code: "custom",
        message: "minPricePerKm cannot be greater than maxPricePerKm",
        path: ["minPricePerKm"],
      });
    }

    if (data.minPricePerKg > data.maxPricePerKg) {
      ctx.addIssue({
        code: "custom",
        message: "minPricePerKg cannot be greater than maxPricePerKg",
        path: ["minPricePerKg"],
      });
    }

    // 🚫 prevent useless config
    if (
      data.maxBasePrice === 0 &&
      data.maxPricePerKm === 0 &&
      data.maxPricePerKg === 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "At least one pricing range must be greater than 0",
        path: ["maxBasePrice"],
      });
    }
  });

export const adminAgencyPricingSchema = z.object({
  body: adminAgencyPricingBodySchema,
});