import { User } from "../../../Domain/Entities/User";
import { Role } from "../../../Infrastructure/Types/types";
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
export interface EditUserProfileRequestDto extends BaseEditUserProfileRequestDto { };

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
export interface UserResetPasswordRequestDTO extends BaseResetPasswordRequestDTO { };


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
export interface UserResponseDto extends AgencyResponseDTO { }

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