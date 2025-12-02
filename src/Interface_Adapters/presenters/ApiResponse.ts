import { ENV } from "../../Infrastructure/constants/env";
import { STATUS, type StatusCode } from "../../Infrastructure/constants/statusCodes";

const isDev = ENV.IS_DEV; 

export class ApiResponse {

    static success<T>(
        message: string,
        data?: T,
        statusCode: StatusCode = STATUS.OK
    ) {
        return {
            success: true,
            message,
            data: data ?? null,
            statusCode
        };
    }

    static failure(
        error: unknown,
        safeMessage: string = "Something went wrong",
        statusCode: StatusCode = STATUS.INTERNAL_SERVER_ERROR
    ) {
        return {
            success: false,
            message: isDev ? String(error) : safeMessage,
            error: isDev ? error : undefined, // optional detailed error
            statusCode
        };
    }
}
