import { KYCStatus, Role } from "../../../Infrastructure/Types/types";

export interface BaseResponseDTO {
  success: boolean;
  message: string;
}

export interface AgencyKYC_DTO {
    agencyId: string;
    tradeLicenseNumber: string;
    tradeLicenseDocument?: Buffer | undefined;
    PANnumber: string;
    PAN_photo?: Buffer | undefined;
    gst_number: string;
    gst_certificate?: Buffer | undefined;
}

export interface AgencyKYCResponseDTO extends BaseResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
    kycStatus:KYCStatus;
  }
};

 
