import { z } from "zod";

/*
*********************************** agency KYC
*/

export const agencyKycBodySchema = z
  .object({
    id: z.string().min(1, "Agency ID is required"),

    tradeLicenseNumber: z
      .string()
      .trim()
      .min(3, "Trade license number is required"),

    PANnumber: z
      .string()
      .trim()
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),

    gst_number: z
      .string()
      .trim()
      .regex(/^\d{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/, "Invalid GST number"),
  })
  .strict();

export const agencyKycSchema = z.object({
  body: agencyKycBodySchema,
});


/*
*********************************** resubmit KYC
*/
export const resubmitKycBodySchema = z
  .object({
    agencyId: z.string().min(1, "Agency ID is required"),

    tradeLicenseNumber: z.string().trim().min(3).optional(),

    PANnumber: z
      .string()
      .trim()
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN")
      .optional(),

    gst_number: z
      .string()
      .trim()
      .regex(/^\d{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/, "Invalid GST")
      .optional(),
  })
  .strict()
  .refine(
    (data) =>
      data.tradeLicenseNumber ||
      data.PANnumber ||
      data.gst_number,
    {
      message: "At least one field must be updated",
    }
  );

export const resubmitKycSchema = z.object({
  body: resubmitKycBodySchema,
});

/*
*********************************** agency pricing
*/
export const agencyPricingBodySchema = z
  .object({
    serviceType: z.enum(["STANDARD", "EXPRESS"]),

    basePrice: z.coerce
      .number()
      .min(0, "Base price cannot be negative"),

    pricePerKm: z.coerce
      .number()
      .min(0, "Price per km cannot be negative"),

    pricePerKg: z.coerce
      .number()
      .min(0, "Price per kg cannot be negative"),
  })
  .strict()
  .superRefine((data, ctx) => {
    // 🚫 prevent useless pricing config
    if (
      data.basePrice === 0 &&
      data.pricePerKm === 0 &&
      data.pricePerKg === 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "At least one pricing value must be greater than 0",
        path: ["basePrice"],
      });
    }
  });

export const agencyPricingSchema = z.object({
  body: agencyPricingBodySchema,
});