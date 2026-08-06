import { z } from "zod";


/*
*********************************** updateHubKyc
*/
export const updateHubKycBodySchema = z
  .object({
    status: z.enum([
      "PENDING",
      "REGISTERED",
      "APPROVED",
      "REJECTED",
      "RESUBMITTED",
    ]),

    reason: z
      .string()
      .trim()
      .min(3, "Reason must be at least 3 characters")
      .max(200, "Reason too long")
      .optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    //  reason required if rejected
    if (data.status === "REJECTED" && !data.reason) {
      ctx.addIssue({
        code: "custom",
        message: "Reason is required when status is REJECTED",
        path: ["reason"],
      });
    }
  });

export const updateHubKycParamsSchema = z.object({
  id: z.string().min(1, "Hub ID is required"),
});

export const updateHubKycSchema = z.object({
  body: updateHubKycBodySchema,
  params: updateHubKycParamsSchema,
});


/*
*********************************** updateAgencyKyc
*/
export const updateAgencyKycBodySchema = z
  .object({
    status: z.enum([
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
    if (data.status === "REJECTED" && !data.rejectReason) {
      ctx.addIssue({
        code: "custom",
        message: "Reject reason is required when status is REJECTED",
        path: ["rejectReason"],
      });
    }
  });

export const updateAgencyKycParamsSchema = z.object({
  id: z.string().min(1, "Agency ID is required"),
});

export const updateAgencyKycSchema = z.object({
  body: updateAgencyKycBodySchema,
  params: updateAgencyKycParamsSchema,
});