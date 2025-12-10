import { User } from "../../../Domain/Entities/User";
import { AgencyResponseDTO } from "../Agency/agency.dto";


export interface GetUsersDBResult {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}



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