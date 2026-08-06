import { z } from "zod";

/*
*********************************** addNewHub
*/
export const addNewHubBodySchema = z
    .object({
        tempHubId: z
            .string()
            .min(1, "tempHubId is required"),

        addressLine1: z
            .string()
            .trim()
            .min(3, "Address is required"),

        city: z
            .string()
            .trim()
            .min(2, "City must be at least 2 characters"),

        state: z
            .string()
            .trim()
            .min(2, "State must be at least 2 characters"),

        pincode: z
            .string()
            .regex(/^\d{6}$/, "Pincode must be 6 digits"),

        location_lat: z.coerce
            .number()
            .min(-90, "Latitude must be >= -90")
            .max(90, "Latitude must be <= 90"),

        location_lng: z.coerce
            .number()
            .min(-180, "Longitude must be >= -180")
            .max(180, "Longitude must be <= 180"),
    })
    .passthrough()

export const addNewHubSchema = z.object({
    body: addNewHubBodySchema,
});



/*
*********************************** addNewHubVerifyOtp
*/
export const addNewHubVerifyOtpBodySchema = z
    .object({
        email: z
            .string()
            .trim()
            .email("Invalid email format"),

        tempHubId: z
            .string()
            .min(1, "tempHubId is required"),

        otp: z
            .string()
            .trim()
            .regex(/^\d{4}$/, "OTP must be 4 digits"),
    })
    .strict();

export const addNewHubVerifyOtpSchema = z.object({
    body: addNewHubVerifyOtpBodySchema,
});

/*
*********************************** addNewHubBasicInfo
*/
export const addNewHubBasicInfoBodySchema = z
    .object({
        agencyId: z
            .string()
            .min(1, "Agency ID is required"),

        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(100),

        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Invalid email format"),

        mobile: z
            .string()
            .trim()
            .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

        role: z
            .string()
            .min(1, "Role is required"), // 🔥 better to convert to enum if possible
    })
    .passthrough()

export const addNewHubBasicInfoSchema = z.object({
    body: addNewHubBasicInfoBodySchema,
});

/*
*********************************** resendOtp
*/
export const resendHubOtpBodySchema = z
    .object({
        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Invalid email format"),
    })
    .strict();

export const resendHubOtpSchema = z.object({
    body: resendHubOtpBodySchema,
});