import { z } from "zod";

/*
*********************************** createRouteGroup
*/
export const createRouteGroupBodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name too long"),

    description: z
      .string()
      .trim()
      .max(300, "Description too long")
      .optional(),

    isActive: z.coerce.boolean().optional(), // handles "true"/"false" from frontend
  })
  .strict();

export const createRouteGroupSchema = z.object({
  body: createRouteGroupBodySchema,
});