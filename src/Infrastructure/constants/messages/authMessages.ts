export const AUTH_MESSAGES = {
    TOKEN_MISSING: "Unauthorized: Access token missing",
    TOKEN_INVALID: "Invalid or expired token",
    ROLE_NOT_ALLOWED: "Forbidden: Role not allowed",

    USER_NOT_FOUND: "User not found",
    USER_BLOCKED: "This account is blocked",
    WRONG_PASSWORD: "Wrong password",

    REFRESH_TOKEN_MISSING: "No refresh token found",
    REFRESH_TOKEN_INVALID: "Invalid refresh token",
    REFRESH_TOKEN_NOT_FOUND: "Refresh token not found",

    LOGOUT_FAILED: "Failed to log out user",
    LOGOUT_SUCCESS: "User logged out successfully",
    
} as const;