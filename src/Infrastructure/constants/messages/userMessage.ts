export const USER_MESSAGES = {
  NOT_FOUND: "User not found",
  USER_ID_MISSING: "User ID is required.",
  USER_FETCH_SUCCESS: "User details fetched successfully",

  PROFILE_FETCHED:"User profile fetched", 
  PROFILE_UPDATED:"User profile updated successfully",
  PROFILE_UPDATE_FAILURE:"User profile updation failed",
  RESET_PASSWORD:"New password updated",
  PASSWORD_NOT_MATCHED:"password does not match",
  RESET_PASSWORD_FAILURE:"Reset password failed , please try again later",
  INVALID_ADDRESS:"Invalid address selection",

  STATUS_UPDATED: "User status updated successfully",
  LIST_FETCH_SUCCESS: "Users fetched successfully",

  TRAVELER_FILE_UPLOAD_FAILURE: "Failed to upload traveler KYC files",
  KYC_ALREADY_APPROVED: "KYC is already approved for this user",
  KYC_SUBMITTED_SUCCESS: "Traveler KYC submitted successfully",
  UPDATE_FAILED: "Failed to update user KYC status",
  KYC_STATUS_UPDATED: "User KYC status updated successfully", 
  KYC_NOT_FOUND: "KYC information not found for this user", 
  KYC_FETCH_SUCCESS: "Traveler KYC information fetched successfully",
  KYC_RESUBMITTED_SUCCESS: "Traveler KYC resubmitted successfully",
  KYC_NOT_ELIGIBLE_FOR_RESUBMIT: "KYC is not eligible for resubmission. Only REJECTED KYC can be resubmitted.",
  TRAVEL_REQUEST_CREATED_SUCCESS: "Travel request created successfully",
  TRAVEL_REQUEST_SAME_ADDRESS_ERROR: "Start address and end address cannot be the same.",
  TRAVEL_REQUESTS_FETCHED_SUCCESS: "Travel requests fetched successfully",
  TRAVEL_REQUEST_ID_MISSING: "Travel request ID is required",
  TRAVEL_REQUEST_NOT_FOUND: "Travel request not found",
} as const;

export const BOOKING_MESSAGE = {
  PINCODE_VALIED:"picode is validated",
  NOT_SERVICEABLE_PINCODE:"One or both pincodes are not serviceable",
}
