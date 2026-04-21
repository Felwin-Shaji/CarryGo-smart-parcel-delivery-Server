import { z } from "zod";

/*
*********************************** geo location
*/
const geoLocationSchema = z.object({
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180),
}).strict();

/*
*********************************** main schema
*/
export const checkServiceableAgencyBodySchema = z
    .object({
        pickupLocation: geoLocationSchema,
        deliveryLocation: geoLocationSchema,

        page: z
            .number()
            .int("Page must be an integer")
            .min(1, "Page must be >= 1")
            .optional(),

        limit: z
            .number()
            .int("Limit must be an integer")
            .min(1, "Limit must be >= 1")
            .max(100, "Limit cannot exceed 100")
            .optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
        const { pickupLocation, deliveryLocation } = data;

        // same location check
        if (
            pickupLocation.lat === deliveryLocation.lat &&
            pickupLocation.lng === deliveryLocation.lng
        ) {
            ctx.addIssue({
                code: "custom",
                message: "Pickup and delivery locations cannot be the same",
                path: ["deliveryLocation"],
            });
        }
    });

export const checkServiceableAgencySchema = z.object({
    body: checkServiceableAgencyBodySchema,
});

/*
*********************************** geo location
*/
const geoLocationTravelerSchema = z
    .object({
        lat: z.coerce.number().min(-90, "Latitude must be >= -90").max(90, "Latitude must be <= 90"),
        lng: z.coerce.number().min(-180, "Longitude must be >= -180").max(180, "Longitude must be <= 180"),
    })
    .strict();

/*
*********************************** checkServiceableTraveler
*/
export const checkServiceableTravelerBodySchema = z
    .object({
        pickupLocation: geoLocationTravelerSchema,
        deliveryLocation: geoLocationTravelerSchema,

        page: z.coerce
            .number()
            .int("Page must be an integer")
            .min(1, "Page must be >= 1")
            .optional(),

        limit: z.coerce
            .number()
            .int("Limit must be an integer")
            .min(1, "Limit must be >= 1")
            .max(100, "Limit cannot exceed 100")
            .optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
        const { pickupLocation, deliveryLocation } = data;

        // prevent same location
        if (
            pickupLocation.lat === deliveryLocation.lat &&
            pickupLocation.lng === deliveryLocation.lng
        ) {
            ctx.addIssue({
                code: "custom",
                message: "Pickup and delivery locations cannot be the same",
                path: ["deliveryLocation"],
            });
        }
    });

export const checkServiceableTravelerSchema = z.object({
    body: checkServiceableTravelerBodySchema,
});


/*
*********************************** address
*/
const bookingAddressSchema = z
    .object({
        id: z.string().nullable().optional(),

        type: z.enum(["TEMP", "SAVED"]).optional(),

        label: z.enum(["Home", "Office", "Warehouse", "Other", "Temporary"]),

        formattedAddress: z.string().nullable(),

        city: z.string(),
        state: z.string(),
        country: z.string(),

        pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),

        location: z.object({
            lat: z.coerce.number().min(-90).max(90),
            lng: z.coerce.number().min(-180).max(180),
        }),

        isDefault: z.boolean().optional()
    })
    .passthrough()

/*
*********************************** package details
*/
const packageDetailsSchema = z
    .object({
        category: z.string().min(1, "Category is required"),

        weightKg: z.coerce
            .number()
            .positive("Weight must be greater than 0"),

        dimensions: z
            .object({
                lengthCm: z.coerce.number().positive(),
                widthCm: z.coerce.number().positive(),
                heightCm: z.coerce.number().positive(),
            })
            .strict(),

        fragile: z.boolean().optional(),

        volumetricWeightKg: z.coerce.number().optional(), 
    })
    .passthrough()

/*
*********************************** main schema
*/
export const calculatePriceBodySchema = z
    .object({
        deliveryType: z.enum(["AGENCY", "TRAVELER"]),

        partnerId: z.string().optional(),
        travelRequestId: z.string().optional(),

        packageDetails: packageDetailsSchema,

        pickupAddress: bookingAddressSchema,
        deliveryAddress: bookingAddressSchema,
    })
    .strict()
    .superRefine((data, ctx) => {
        const { deliveryType, partnerId, travelRequestId } = data;

        // ✅ conditional validation
        if (deliveryType === "AGENCY" && !partnerId) {
            ctx.addIssue({
                code: "custom",
                message: "partnerId is required for AGENCY delivery",
                path: ["partnerId"],
            });
        }

        if (deliveryType === "TRAVELER" && !travelRequestId) {
            ctx.addIssue({
                code: "custom",
                message: "travelRequestId is required for TRAVELER delivery",
                path: ["travelRequestId"],
            });
        }

        // 🚫 prevent same pickup & delivery
        if (
            data.pickupAddress.location.lat === data.deliveryAddress.location.lat &&
            data.pickupAddress.location.lng === data.deliveryAddress.location.lng
        ) {
            ctx.addIssue({
                code: "custom",
                message: "Pickup and delivery cannot be the same location",
                path: ["deliveryAddress"],
            });
        }
    });

export const calculatePriceSchema = z.object({
    body: calculatePriceBodySchema,
});

const agencyBookingSchema = z
  .object({
    deliveryType: z.literal("AGENCY"),

    partnerId: z.string().min(1),
    fromHubId: z.string().min(1),
    toHubId: z.string().min(1),

    pickupAddress: bookingAddressSchema,
    deliveryAddress: bookingAddressSchema,

    packageDetails: packageDetailsSchema,
  })
  .passthrough()

/*
*********************************** TRAVELER booking
*/
const travelerBookingSchema = z
  .object({
    deliveryType: z.literal("TRAVELER"),

    partnerId: z.string().min(1),
    travelRequestId: z.string().min(1),

    pickupAddress: bookingAddressSchema,
    deliveryAddress: bookingAddressSchema,

    packageDetails: packageDetailsSchema,
  })
  .strict();

/*
*********************************** MAIN
*/
export const createBookingBodySchema = z.discriminatedUnion(
  "deliveryType",
  [agencyBookingSchema, travelerBookingSchema]
);

export const createBookingSchema = z.object({
  body: createBookingBodySchema,
});