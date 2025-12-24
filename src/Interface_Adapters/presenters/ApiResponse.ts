import { ENV } from "../../Infrastructure/constants/env";

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
        const message =
            error instanceof Error
                ? error.message
                : typeof error === "string"
                    ? error
                    : safeMessage;

        return {
            success: false,
            message: message,
            error: isDev ? error : undefined,
        };
    };

}
