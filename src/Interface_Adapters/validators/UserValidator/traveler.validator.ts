import { z } from "zod";

/*
*********************************** address schema
*/
const travelerAddressSchema = z
    .object({
        type: z.enum(["TEMP", "SAVED"]).optional(),
        label: z.enum(["Home", "Office", "Warehouse", "Other", "Temporary"]),

        formattedAddress: z.string().nullable(),

        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),

        pincode: z
            .string()
            .regex(/^\d{6}$/, "Pincode must be 6 digits"),

        location: z.object({
            lat: z.number().min(-90).max(90),
            lng: z.number().min(-180).max(180),
        }),

        isDefault: z.boolean().optional(),
    })
    .strict();

/*
*********************************** main schema
*/
export const createTravelRequestBodySchema = z
    .object({
        startAddress: travelerAddressSchema,
        endAddress: travelerAddressSchema,

        departureAt: z.string().datetime("Invalid departure date"),

        arrivalAt: z
            .string()
            .datetime("Invalid arrival date")
            .optional(),

        capacityKg: z
            .number()
            .positive("Capacity must be greater than 0"),

        totalVolumeCm3: z
            .number()
            .positive("Volume must be greater than 0"),

        allowedPackageDimensions: z
            .object({
                maxLengthCm: z.number().positive(),
                maxWidthCm: z.number().positive(),
                maxHeightCm: z.number().positive(),
            })
            .strict(),

        pricePerKg: z
            .number()
            .positive("Price must be positive")
            .optional(),

        modeOfTransport: z.enum([
            "AIR",
            "TRAIN",
            "BUS",
            "CAR",
            "SHIP",
            "FLIGHT",
            "BIKE"
        ]),

        description: z
            .string()
            .max(500, "Description too long")
            .optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
        const departure = new Date(data.departureAt);

        //  past date check
        if (departure < new Date()) {
            ctx.addIssue({
                code: "custom",
                message: "Departure must be in the future",
                path: ["departureAt"],
            });
        }

        // arrival validation
        if (data.arrivalAt) {
            const arrival = new Date(data.arrivalAt);

            if (arrival <= departure) {
                ctx.addIssue({
                    code: "custom",
                    message: "Arrival must be after departure",
                    path: ["arrivalAt"],
                });
            }
        }

        // same start & end location check
        if (
            data.startAddress.location.lat === data.endAddress.location.lat &&
            data.startAddress.location.lng === data.endAddress.location.lng
        ) {
            ctx.addIssue({
                code: "custom",
                message: "Start and end locations cannot be the same",
                path: ["endAddress"],
            });
        }
    });

export const createTravelRequestSchema = z.object({
    body: createTravelRequestBodySchema,
});

/*
*********************************** submitTravelerKYC
*/
export const submitTravelerKycBodySchema = z
    .object({
        idType: z.enum(["AADHAAR", "DL", "PASSPORT"], {
            message: "ID type must be AADHAAR, DL, or PASSPORT",
        }),

        idNumber: z
            .string()
            .min(5, "ID number is too short")
            .max(20, "ID number is too long")
            .trim(),
    })
    .strict()
    .superRefine((data, ctx) => {
        const { idType, idNumber } = data;

        if (idType === "AADHAAR" && !/^\d{12}$/.test(idNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Aadhaar must be 12 digits",
                path: ["idNumber"],
            });
        }

        if (idType === "DL" && !/^[A-Z0-9]{6,20}$/i.test(idNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Invalid Driving License number",
                path: ["idNumber"],
            });
        }

        if (idType === "PASSPORT" && !/^[A-Z][0-9]{7}$/.test(idNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passport must be like A1234567",
                path: ["idNumber"],
            });
        }
    });

export const submitTravelerKycSchema = z.object({
    body: submitTravelerKycBodySchema,
});

/**
 * ********************* reSubmitTravelerKycSchema
 */
export const reSubmitTravelerKycBodySchema = z
    .object({
        idType: z.enum(["AADHAAR", "DL", "PASSPORT"]).optional(),

        idNumber: z
            .string()
            .min(5, "ID number is too short")
            .max(20, "ID number is too long")
            .trim()
            .optional(),

        resubmit: z.string().optional()
    })
    .strict()
    // at least one field required
    .refine((data) => data.idType || data.idNumber, {
        message: "At least one field must be provided",
    })
    // enforce both or none (IMPORTANT)
    .refine(
        (data) =>
            (!data.idType && !data.idNumber) ||
            (data.idType && data.idNumber),
        {
            message: "Both idType and idNumber must be provided together",
        }
    )
    .superRefine((data, ctx) => {
        const { idType, idNumber } = data;

        // guard (fixes your TS error)
        if (!idType || !idNumber) return;

        if (idType === "AADHAAR" && !/^\d{12}$/.test(idNumber)) {
            ctx.addIssue({
                code: "custom",
                message: "Aadhaar must be 12 digits",
                path: ["idNumber"],
            });
        }

        if (idType === "DL" && !/^[A-Z0-9]{6,20}$/i.test(idNumber)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid Driving License number",
                path: ["idNumber"],
            });
        }

        if (idType === "PASSPORT" && !/^[A-Z][0-9]{7}$/.test(idNumber)) {
            ctx.addIssue({
                code: "custom",
                message: "Passport must be like A1234567",
                path: ["idNumber"],
            });
        }
    });

export const reSubmitTravelerKycSchema = z.object({
    body: reSubmitTravelerKycBodySchema,
});