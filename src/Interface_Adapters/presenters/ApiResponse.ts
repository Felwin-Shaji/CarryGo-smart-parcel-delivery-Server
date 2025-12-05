import { ENV } from "../../Infrastructure/constants/env";
import { STATUS, type StatusCode } from "../../Infrastructure/constants/statusCodes";

const isDev = ENV.IS_DEV; 

export class ApiResponse {

    static success<T>(
        message: string,
        data?: T,
    ) {
        return {
            success: true,
            message,
            data: data ?? null,
        };
    }

    static failure(
        error: unknown,
        safeMessage: string = "Something went wrong",
    ) {
        return {
            success: false,
            message: isDev ? String(error) : safeMessage,
            error: isDev ? error : undefined, // optional detailed error
        };
    }
}
