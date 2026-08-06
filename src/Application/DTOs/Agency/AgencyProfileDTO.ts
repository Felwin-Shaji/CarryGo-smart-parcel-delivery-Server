import { Role } from "../../../Infrastructure/Types/CommonTypes";
import { BaseEditUserProfileRequestDto, BaseResetPasswordRequestDTO, BaseUserResponseDTO } from "../User/UserDTO";

/**
 * Represents the response structure for a agency Profile.
 */
export interface AgencyProfileResponseDTO extends BaseUserResponseDTO {
    role: Role
}

export type EditAgencyProfileRequestDto = BaseEditUserProfileRequestDto;

export type AgencyResetPasswordRequestDTO = BaseResetPasswordRequestDTO;
