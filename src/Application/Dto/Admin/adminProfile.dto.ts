import { Role } from "../../../Infrastructure/Types/types";
import { BaseEditUserProfileRequestDto, BaseResetPasswordRequestDTO, BaseUserResponseDTO } from "../User/user.dto";

/**
 * Represents the response structure for a admin Profile.
 */
export interface AdminProfileResponseDTO extends BaseUserResponseDTO {
    role: Role
}

export interface EditAdminProfileRequestDto extends BaseEditUserProfileRequestDto { };

export type AdminResetPasswordRequestDTO = BaseResetPasswordRequestDTO;



