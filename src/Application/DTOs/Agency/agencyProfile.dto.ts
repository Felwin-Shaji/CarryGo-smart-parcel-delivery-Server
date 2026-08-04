import { Role } from "../../../Infrastructure/Types/types";
import { BaseEditUserProfileRequestDto, BaseResetPasswordRequestDTO, BaseUserResponseDTO } from "../User/user.dto";

/**
 * Represents the response structure for a agency Profile.
 */
export interface AgencyProfileResponseDTO extends BaseUserResponseDTO {
    role: Role
}

export type EditAgencyProfileRequestDto = BaseEditUserProfileRequestDto;

export type AgencyResetPasswordRequestDTO = BaseResetPasswordRequestDTO;
