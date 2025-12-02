import { Agency } from "../../../Domain/Entities/Agency/Agency";
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
    kycStatus: KYCStatus;
  }
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

export interface AddHubResponseDTO {
  success: boolean;
  message: string;
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





