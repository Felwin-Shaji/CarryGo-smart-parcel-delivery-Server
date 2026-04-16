import { z } from "zod";

/*
*********************************** updateUserKyc
*/
export const updateUserKycBodySchema = z
  .object({
    kycStatus: z.enum([
      "PENDING",
      "REGISTERED",
      "APPROVED",
      "REJECTED",
      "RESUBMITTED",
    ]),

    rejectReason: z
      .string()
      .trim()
      .min(3, "Reject reason must be at least 3 characters")
      .max(200, "Reject reason too long")
      .optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.kycStatus === "REJECTED" && !data.rejectReason) {
      ctx.addIssue({
        code: "custom",
        message: "Reject reason is required when status is REJECTED",
        path: ["rejectReason"],
      });
    }
  });

export const updateUserKycParamsSchema = z.object({
  id: z.string().min(1, "User ID is required"),
});

export const updateUserKycSchema = z.object({
  body: updateUserKycBodySchema,
  params: updateUserKycParamsSchema,
});