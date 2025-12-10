export const WORKER_MESSAGES = {
  EMAIL_ALREADY_EXISTS: "Worker with this email already exists",
  OTP_ALREADY_SENT: "OTP already sent. Please verify the OTP.",
  OTP_SESSION_NOT_FOUND: "No OTP session found for this email",
  INVALID_TEMP_ID: "Invalid temporary worker ID",
  OTP_EXPIRED: "OTP expired. Please request a new one.",
  OTP_MISMATCH: "Invalid OTP",
  OTP_VERIFIED: "Worker OTP verified successfully",
  WORKER_ADDED_SUCCESSFULLY: "Worker added successfully",

  SESSION_NOT_FOUND: "No session found. Please start the registration process again.",
  KYC_FILES_REQUIRED: "KYC files (document and selfie) are required.",
} as const;
