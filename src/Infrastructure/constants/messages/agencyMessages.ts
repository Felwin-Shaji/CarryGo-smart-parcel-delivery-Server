export const AGENCY_MESSAGES = {
    NOT_FOUND: "Agency not found",
    INVALID_ID: "Invalid agency ID",
    KYC_STATUS_UPDATION_FAILED: "KYC status updation failed",
    FETCH_SUCCESS: "Agency fetched successfully",
    ID_MISSING: "Agency ID is required.",
    LIST_FETCH_SUCCESS: "Agencies fetched successfully.",
    STATUS_UPDATED: "Agency status updated successfully.",
    KYC_STATUS_UPDATED: "Agency KYC status updated successfully.",
    KYC_SUBMITED:"Agency kyc submitted successfully",
    FETCH_AGENCY_WITH_KYC:"Agency with kyc fetched successfully",
    STATUS_CHECHED_SUCCESS:`Temporary hub status checked successfully`,
    OTP_SENT_SUCCESSFULLY: "OTP sent successfully. Proceed to verification.",
    HUB_ADDED_SUCCESSFULLY: "Hub added successfully.",
    AGENCY_KYC_NOT_FOUND: "Agency KYC record not found.",
    KYC_RESUBMITED: "Agency KYC resubmitted successfully.",

    CANNOT_RESUBMIT_KYC: "KYC can only be resubmitted if the status is REJECTED.",

    INVALID_OTP: "Invalid OTP. Please try again.",
    OTP_RESENT: "OTP resent successfully.",
} as const;
