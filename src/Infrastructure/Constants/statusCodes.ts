export const STATUS = {

    // ✅ Success responses
    OK: 200, // Request succeeded
    CREATED: 201, // Resource created successfully
    ACCEPTED: 202, // Request accepted for processing (async)
    NO_CONTENT: 204, // Request succeeded, but no content to return

    // ⚠️ Client error responses
    BAD_REQUEST: 400, // Invalid request data
    UNAUTHORIZED: 401, // Missing or invalid authentication
    PAYMENT_REQUIRED: 402, // Reserved for future use (like payment errors)
    FORBIDDEN: 403, // Authenticated, but no permission
    NOT_FOUND: 404, // Resource not found
    METHOD_NOT_ALLOWED: 405, // HTTP method not supported
    CONFLICT: 409, // Resource conflict (e.g., duplicate email)
    UNPROCESSABLE_ENTITY: 422, // Validation error
    TOO_MANY_REQUESTS: 429, // Rate limit exceeded

    // ❌ Server error responses
    INTERNAL_SERVER_ERROR: 500, // General server error
    NOT_IMPLEMENTED: 501, // API not implemented
    BAD_GATEWAY: 502, // Invalid response from upstream server
    SERVICE_UNAVAILABLE: 503, // Server down or overloaded
    GATEWAY_TIMEOUT: 504, // Timeout from upstream service
    
} as const;

export type StatusCode = (typeof STATUS)[keyof typeof STATUS];
