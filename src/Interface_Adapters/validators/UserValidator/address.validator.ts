import { z } from "zod";

/*
*********************************** addUserAddress
*/
export const addUserAddressBodySchema = z
  .object({
    id: z.string().optional(), // optional (or remove)

    label: z.enum(["Home", "Office", "Warehouse", "Other"]),

    addressLine1: z
      .string()
      .min(3, "Address line 1 is required")
      .max(100)
      .optional(),

    addressLine2: z
      .string()
      .max(100)
      .optional(),

    city: z.string().min(0).optional(),
    state: z.string().min(0).optional(),
    country: z.string().min(0).optional(),

    pincode: z
      .string()
      .regex(/^\d{6}$/, "Pincode must be 6 digits"),

    formattedAddress: z.string().min(5),

    location: z
      .object({
        lat: z.coerce.number().min(-90).max(90),
        lng: z.coerce.number().min(-180).max(180),
      })
      .strict(),
  })
  .strict();

export const addUserAddressSchema = z.object({
  body: addUserAddressBodySchema,
});