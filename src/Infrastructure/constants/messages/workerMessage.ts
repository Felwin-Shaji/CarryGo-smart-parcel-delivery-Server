export const WORKER_MESSAGES = {
  EMAIL_ALREADY_EXISTS: "Worker with this email already exists",
  OTP_ALREADY_SENT: "OTP already sent. Please verify the OTP.",
  OTP_SESSION_NOT_FOUND: "No OTP session found for this email",
  INVALID_TEMP_ID: "Invalid temporary worker ID",
  OTP_EXPIRED: "OTP expired. Please request a new one.",
  OTP_MISMATCH: "Invalid OTP",
  OTP_VERIFIED: "Worker OTP verified successfully",
} as const;
