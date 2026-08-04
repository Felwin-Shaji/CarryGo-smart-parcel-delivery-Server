import { z } from "zod";

/*
*********************************** resetUserPassword
*/
export const resetAdminPasswordBodySchema = z
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

export const resetAdminPasswordSchema = z.object({
    body: resetAdminPasswordBodySchema,
});

/*
*********************************** editAdminProfile
*/
export const editAdminProfileBodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),

    mobile: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  })
  .strict();

export const editAdminProfileSchema = z.object({
  body: editAdminProfileBodySchema,
});