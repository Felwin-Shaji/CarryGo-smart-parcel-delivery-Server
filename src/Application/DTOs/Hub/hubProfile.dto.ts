import { Role } from "../../../Infrastructure/Types/types";
import { BaseEditUserProfileRequestDto, BaseResetPasswordRequestDTO, BaseUserResponseDTO } from "../User/user.dto";

export interface HubProfileResponseDTO extends BaseUserResponseDTO {
    role:Role
};

export type EditHubProfileRequestDto = BaseEditUserProfileRequestDto;

export type HubResetPasswordRequestDTO = BaseResetPasswordRequestDTO;