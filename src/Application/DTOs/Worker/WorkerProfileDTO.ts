import { Role } from "../../../Infrastructure/Types/types";
import { BaseEditUserProfileRequestDto, BaseResetPasswordRequestDTO, BaseUserResponseDTO } from "../User/UserDTO";

/**
 * Represents the response structure for a worker Profile.
 */
export interface WorkerProfileResponseDTO extends BaseUserResponseDTO {
    role: Role
}

export type EditWorkerProfileRequestDto = BaseEditUserProfileRequestDto;

export type WorkerResetPasswordRequestDTO = BaseResetPasswordRequestDTO;
