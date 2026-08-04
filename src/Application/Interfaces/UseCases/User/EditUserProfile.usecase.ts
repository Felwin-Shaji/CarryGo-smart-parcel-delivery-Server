import { EditUserProfileRequestDto } from "../../../DTOs/User/user.dto";

export interface IEditUserProfileUseCase {
    execute(userId: string, dto: EditUserProfileRequestDto): Promise<void>;
}