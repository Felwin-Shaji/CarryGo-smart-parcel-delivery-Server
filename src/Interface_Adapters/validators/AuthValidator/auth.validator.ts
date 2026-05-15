import { Role } from "../../../Domain/Enums/Roles";
import { z } from "zod";

export const sendOtpBodySchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),

        email: z
            .string()
            .email("Invalid email format"),

        mobile: z
            .string()
            .regex(/^[0-9]{10}$/, "Mobile must be 10 digits")
            .optional(),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),

        confirmPassword: z
            .string()
            .min(6, "Confirm password is required"),

        role: z.enum(
            [Role.ADMIN, Role.AGENCY, Role.USER, Role.HUB, Role.WORKER],
            "Role must be one of: admin, agency, user, hub, worker"
        ),

        isResend: z.boolean().optional(),
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const sendOtpSchema = z.object({
    body: sendOtpBodySchema,
});

export type SendOtpDTO = z.infer<typeof sendOtpBodySchema>;


/** 
 *********************************** verifyOtp
*/
export const verifyOtpBodySchema = z
    .object({
        email: z.string().email("Invalid email format"),

        otp: z
            .string()
            .min(4, "OTP must be at least 4 digits")
            .max(6, "OTP must be at most 6 digits"),

        role: z.enum(["user", "agency"], "Role must be one of: user, agency"),
    })
    .strict();

export const verifyOtpSchema = z.object({ body: verifyOtpBodySchema });

/**
 *********************************** refreshToken
 */
export const refreshTokenBodySchema = z
    .object({
        role: z.enum(
            [Role.ADMIN, Role.AGENCY, Role.USER, Role.HUB, Role.WORKER],
            "Role must be one of: admin, agency, user, hub, worker"
        ),
    })
    .strict();

export const refreshTokenSchema = z.object({
    body: refreshTokenBodySchema,
});

/*
*********************************** login
*/
export const loginBodySchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),

        role: z.enum(
            [Role.ADMIN, Role.AGENCY, Role.USER, Role.HUB, Role.WORKER],
            "Role must be one of: admin, agency, user, hub, worker"
        ),
    })
    .strict();

export const loginSchema = z.object({
    body: loginBodySchema,
});

/*
***********************************logout
*/
export const logoutBodySchema = z
    .object({
        userId: z.string().min(1, "User id is required"),

        role: z.enum(
            [Role.ADMIN, Role.AGENCY, Role.USER, Role.HUB, Role.WORKER],
            "Role must be one of: admin, agency, user, hub, worker"
        ),
    })
    .strict();

export const logoutSchema = z.object({
    body: logoutBodySchema,
});

/*
*********************************** forgotPassword
*/
export const forgotPasswordBodySchema = z
    .object({
        email: z.string().email("Invalid email format"),

        role: z.enum(
            [Role.ADMIN, Role.AGENCY, Role.USER, Role.HUB, Role.WORKER],
            "Role must be one of: admin, agency, user, hub, worker"
        ),
    })
    .strict();


export const forgotPasswordSchema = z.object({
    body: forgotPasswordBodySchema,
});

/*
*********************************** resetPassword
*/
export const resetPasswordParamsSchema = z.object({
    token: z.string().min(1, "Reset token is required"),
});

export const resetPasswordBodySchema = z
    .object({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),

        confirmPassword: z
            .string()
            .min(6, "Confirm password is required"),

        role: z.enum(
            [Role.ADMIN, Role.AGENCY, Role.USER, Role.HUB, Role.WORKER],
            "Role must be one of: admin, agency, user, hub, worker"
        ),
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const resetPasswordSchema = z.object({
    params: resetPasswordParamsSchema,
    body: resetPasswordBodySchema,
});
