import { z } from "zod";

/*
*********************************** editUserProfile
*/
export const editUserProfileBodySchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name cannot exceed 50 characters")
            .trim(),

        mobile: z
            .string()
            .regex(/^[6-9]\d{9}$/, "Invalid mobile number"), // Indian format
    })
    .strict();

export const editUserProfileSchema = z.object({
    body: editUserProfileBodySchema,
});

/*
*********************************** resetUserPassword
*/
export const resetUserPasswordBodySchema = z
    .object({
        currentPassword: z
            .string()
            .min(6, "Current password must be at least 6 characters"),

        newPassword: z
            .string()
            .min(6, "New password must be at least 6 characters")
            .max(100, "Password too long"),

        confirmPassword: z
            .string()
            .min(6, "Confirm password must be at least 6 characters"),
    })
    .strict()
    // check new !== current
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "New password must be different from current password",
        path: ["newPassword"],
    })
    // check new === confirm
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const resetUserPasswordSchema = z.object({
    body: resetUserPasswordBodySchema,
});

