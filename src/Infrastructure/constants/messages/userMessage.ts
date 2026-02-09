export const USER_MESSAGES = {
  NOT_FOUND: "User not found",
  USER_ID_MISSING: "User ID is required.",

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
} as const;

export const BOOKING_MESSAGE = {
  PINCODE_VALIED:"picode is validated",
  NOT_SERVICEABLE_PINCODE:"One or both pincodes are not serviceable",
}
