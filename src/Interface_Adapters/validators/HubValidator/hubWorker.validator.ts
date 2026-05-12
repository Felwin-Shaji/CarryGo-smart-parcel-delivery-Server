import { z } from "zod";

/*
*********************************** body
*/
export const reSubmitWorkerKycBodySchema = z
  .object({
    idType: z.enum(["AADHAAR", "DL", "PASSPORT"]),

    idNumber: z
      .string()
      .trim()
      .min(5, "ID number too short")
      .max(20, "ID number too long"),
  })
  .passthrough()
  .superRefine((data, ctx) => {
    const { idType, idNumber } = data;

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

/*
*********************************** params
*/
export const reSubmitWorkerKycParamsSchema = z.object({
  id: z.string().min(1, "Worker ID is required"),
});

/*
*********************************** main
*/
export const reSubmitWorkerKycSchema = z.object({
  body: reSubmitWorkerKycBodySchema,
  params: reSubmitWorkerKycParamsSchema,
});


/*
*********************************** addNewWorker
*/
export const addWorkerTempBodySchema = z
  .object({
    name: z.string().trim().min(2).max(100),

    email: z.string().trim().toLowerCase().email(),

    mobile: z.string().trim().regex(/^[6-9]\d{9}$/),

    role: z.literal("worker"), // 🔥 lock this

    workerRole: z.enum([
      "PICKUP",
      "TRANSPORT",
      "OUT_FOR_DELIVERY",
    ]),
  })
  .passthrough()

export const addWorkerTempSchema = z.object({
  body: addWorkerTempBodySchema,
});

export const verifyWorkerOtpBodySchema = z
  .object({
    email: z.string().trim().toLowerCase().email(),

    otp: z
      .string()
      .trim()
      .regex(/^\d{4}$/, "OTP must be 4 digits"), // or 6 if you upgrade
  })
  .passthrough();

export const verifyWorkerOtpSchema = z.object({
  body: verifyWorkerOtpBodySchema,
});

export const workerKycUploadBodySchema = z
  .object({
    email: z.string().trim().toLowerCase().email(),

    idType: z.enum(["AADHAAR", "DL", "PASSPORT"]),

    idNumber: z.string().trim().min(5).max(20),
  })
  .passthrough()
  .superRefine((data, ctx) => {
    const { idType, idNumber } = data;

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

export const workerKycUploadSchema = z.object({
  body: workerKycUploadBodySchema,
});