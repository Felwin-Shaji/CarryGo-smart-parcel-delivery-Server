export const HUB_MESSAGES = {
    SESSION_INVALID: "Invalid or expired hub registration session",
    OTP_NOT_VERIFIED: "OTP verification not completed",
    HUB_CREATED: "Hub created successfully",

    EMAIL_ALREADY_EXISTS: "Hub with this email already exists",
    NAME_ALREADY_EXISTS: "Hub name already exists under this agency",
    OTP_ALREADY_SENT: "OTP already sent. Please verify the OTP.",

    OTP_SESSION_NOT_FOUND: "No OTP process found for this email",
    OTP_RESENT: "Hub OTP resent successfully",


    INVALID_TEMP_SESSION: "Invalid tempHubId or email",
    OTP_MISMATCH: "Invalid OTP",
    OTP_VERIFIED: "OTP verified successfully",

    VERIFICATION_IMAGE_REQUIRED: "Verification image is required",
    VERIFICATION_IMAGE_UPLOAD_FAILED: "Failed to upload verification image",
} as const;
