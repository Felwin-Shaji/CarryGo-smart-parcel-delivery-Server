export const WORKER_MESSAGES = {
  EMAIL_ALREADY_EXISTS: "Worker with this email already exists",
  OTP_ALREADY_SENT: "OTP already sent. Please verify the OTP.",
  OTP_SESSION_NOT_FOUND: "No OTP session found for this email",
  INVALID_TEMP_ID: "Invalid temporary worker ID",
  OTP_EXPIRED: "OTP expired. Please request a new one.",
  OTP_MISMATCH: "Invalid OTP",
  OTP_VERIFIED: "Worker OTP verified successfully",
  WORKER_ADDED_SUCCESSFULLY: "Worker added successfully",
  OVERVIEW_FETCHED: "Wroker over view fetched successfully",

  LIST_FETCHED: "Wrokers list fetched successfully",

  WORKERS_NOT_FOUND: "No workers found add new workers",

  SESSION_NOT_FOUND: "No session found. Please start the registration process again.",
  KYC_FILES_REQUIRED: "KYC files (document and selfie) are required.",
  ID_MISSING: "worker id is missing",

  KYC_NOT_FOUND: "KYC record not found",
  KYC_NOT_ELIGIBLE_FOR_RESUBMIT: "Only rejected KYC can be resubmitted",
  KYC_RESUBMITTED_SUCCESSFULLY: "KYC resubmitted successfully",
  DOCUMENT_UPLOAD_FAILED: "Document upload failed",
  SELFIE_UPLOAD_FAILED: "Selfie upload failed",
  NOTHING_TO_UPDATE: "No changes provided for resubmission",
  KYC_FOUNDED: "Worker kyc fetched",
  ALREADY_APPROVERD:"kyc already approver",
  ALREADY_REJECTED:"Rejection reason is required",
  KYC_UPDATED:"worker kyc updated",

  WORKER_SHIPMENTS_FETCH_SUCCESS:"Worker shipments fetched successfully",
  SHIPMENT_DETAILS_FETCH_SUCCESS:"Worker shipment details fetched successfully",
  SHIPMENT_NOT_FOUND:"Shipment not found",
  SHIPMENT_STATUS_UPDATED:"Shipment status updated successfully",
} as const;
