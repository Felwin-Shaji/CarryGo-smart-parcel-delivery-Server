import { KYCStatus, Role } from "../../../Infrastructure/Types/types";
import { UserDTO } from "../Auth/Auth.dto";


/**
 * RegisterAgency Dtos
 */

export interface RegisterAgencyDTO extends UserDTO { }

export interface RegisterAgencyResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile: string | null;
  role: Role;
  kycStatus: KYCStatus;
  walletBalance: number;
  commisionRate: number;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgencyKYC_DTO {
  id: string;
  tradeLicenseNumber: string;
  PANnumber: string;
  gst_number: string;
  status: KYCStatus;
}

export interface AgencyResubmitKycDTO { 
  agencyId: string;
  tradeLicenseNumber: string;
  tradeLicenseDocument?: string;   
  PANnumber: string;
  PAN_photo?: string;              
  gst_number: string;
  gst_certificate?: string;        
  status?: KYCStatus;              
}


export interface AgencyKYCResponseDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  kycStatus: KYCStatus;

};

/**
 * AddNewHub Dtos
 */
export interface AddNewHubBaseDto {
  agencyId: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
}

export interface AddNewHubAddressDto {
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  location_lat: number;
  location_lng: number;
  verificationImage?: Buffer | null;
}

export interface AddHubDTO extends AddNewHubBaseDto, AddNewHubAddressDto {
}

export interface agencyAddHubResponseDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    kycStatus: string;
}

export interface AddNewHubVerifyOtpDTO {
  email: string;
  tempHubId: string;
  otp: string;
}


/**
 * get agency Dtos
 */

export interface GetAgenciesDTO {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: "desc" | "asc";
  blocked?: boolean | null;
  kycStatus?: string;
  startDate?: string;
  endDate?: string;
}

export interface AgencyResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isBlocked: boolean;
  kycStatus: string;
  createdAt: Date;
}


export interface GetAgenciesResponseDTO {
  data: AgencyResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * agency with kyc after lookup
 */
export interface KycResponseDTO {
  id: string;
  PAN_photo: string;
  PANnumber: string;
  gst_certificate: string;
  gst_number: string;
  tradeLicenseDocument: string;
  tradeLicenseNumber: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "RESUBMITTED";
  createdAt: Date | null;
  updatedAt: Date | null;
}



export interface AgencyWithKYCResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isBlocked: boolean;
  kycStatus: string;
  createdAt: Date;
  rejectReason?: string | null;

  kyc: KycResponseDTO | null;
}

/**
 * updateAgencyKycStatus Dtos
 */

export interface updateAgencyKycStatusDTO {
  status: KYCStatus,
  rejectReason?: string
};












