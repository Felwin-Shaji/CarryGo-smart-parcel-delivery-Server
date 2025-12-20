import { EditUserProfileRequestDto } from "../../../Dto/User/user.dto";

export interface IEditUserProfileUseCase {
    execute(userId: string, dto: EditUserProfileRequestDto): Promise<void>;
}