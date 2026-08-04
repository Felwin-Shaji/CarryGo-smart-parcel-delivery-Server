import { Role } from "../../../Infrastructure/Types/types";
import { BaseEditUserProfileRequestDto, BaseResetPasswordRequestDTO, BaseUserResponseDTO } from "../User/UserDTO";

/**
 * Represents the response structure for a admin Profile.
 */
export interface AdminProfileResponseDTO extends BaseUserResponseDTO {
    role: Role
}

export type  EditAdminProfileRequestDto =  BaseEditUserProfileRequestDto;

export type AdminResetPasswordRequestDTO = BaseResetPasswordRequestDTO;



