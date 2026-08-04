import { EditUserProfileRequestDto } from "../../../DTOs/User/UserDTO";

export interface IEditUserProfileUseCase {
    execute(userId: string, dto: EditUserProfileRequestDto): Promise<void>;
}