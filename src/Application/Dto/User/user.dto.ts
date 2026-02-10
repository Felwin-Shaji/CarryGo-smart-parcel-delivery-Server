import { User } from "../../../Domain/Entities/User";
import { KYCStatus, Role } from "../../../Infrastructure/Types/types";
import { AgencyResponseDTO } from "../Agency/agency.dto";


export interface GetUsersDBResult {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * This is Base User Response DTO
 */
export interface BaseUserResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isBlocked: boolean;
  kycStatus: string;
  createdAt: Date;
}

/**
 * Represents the response structure for a user Profile.
 */
export interface UserProfileResponseDTO extends BaseUserResponseDTO {
  role: Role
}

/**
 * Base request structure for edit profile
 */
export interface BaseEditUserProfileRequestDto {
  name: string;
  mobile: string;
};

/**
 * request structure for edit user Profile
 */
export type EditUserProfileRequestDto = BaseEditUserProfileRequestDto;

/**
 * Base request reset passowrd data
 */
export interface BaseResetPasswordRequestDTO {
  currentPassword: string;
  newPassword: string;
}

/**
 * response reset password
 */
export type UserResetPasswordRequestDTO = BaseResetPasswordRequestDTO;

/**
 * Data Transfer Objects (DTOs) for user-related operations.
 */
export interface GetUserDto {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: "desc" | "asc";
};

/**
 * Represents the response structure for a user.
 */
export type UserResponseDto = AgencyResponseDTO;

/**
 * Represents the response structure for fetching a paginated list of users.
 */
export interface GetUserResponseDto {
  data: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

/**
 * updateAgencyKycStatus Dtos
 */
export interface updateUserKycStatusDTO {
  kycStatus: KYCStatus,
  rejectReason?: string
};

export interface userKycResponseDTO {
  id:string;
  subjectId: string;
  subjectType: Role;
  idType: string;
  idNumberEncrypted: string;
  documentUrl: string;
  selfieUrl: string;
  status: KYCStatus;
  createdAt: Date;
  reviewedAt: Date | null;
}



export interface GetUserOverviewResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role:Role;
  kycStatus: string;
  walletBalance: number;
  isBlocked: boolean;
  createdAt: Date;
  rejectReason?: string | null;
  
  kyc: userKycResponseDTO | null;
}

