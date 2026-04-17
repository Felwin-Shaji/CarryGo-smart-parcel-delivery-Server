import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import logger from "@/Infrastructure/logger/logger";

type RequestSchema = z.ZodObject<{
    body?: z.ZodTypeAny;
    params?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
}>;

export const validateRequest = <T extends RequestSchema>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {

            const validatedData = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            if (validatedData.body !== undefined) {
                req.body = validatedData.body;
            }

            if (validatedData.params && typeof validatedData.params === "object") {
                req.params = validatedData.params as Record<string, string>;
            }

            if (validatedData.query !== undefined && typeof validatedData.query === "object") {
                req.query = validatedData.query as Record<string, string>;
            }

            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors = error.issues.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                }));

                logger.error("Validation error", { errors: formattedErrors });
                 console.log("ZOD ERROR:", JSON.stringify(error, null, 2));

                return next(
                    new AppError(
                        "Validation failed",
                        STATUS.BAD_REQUEST,
                        true,
                        formattedErrors
                    )
                );
            }

            next(error);
        }
    };
};