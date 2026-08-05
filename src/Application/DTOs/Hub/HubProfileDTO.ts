import { Role } from "../../../Infrastructure/Types/CommonTypes";
import { BaseEditUserProfileRequestDto, BaseResetPasswordRequestDTO, BaseUserResponseDTO } from "../User/UserDTO";

export interface HubProfileResponseDTO extends BaseUserResponseDTO {
    role:Role
};

export type EditHubProfileRequestDto = BaseEditUserProfileRequestDto;

export type HubResetPasswordRequestDTO = BaseResetPasswordRequestDTO;