import { GetUserDto, GetUserResponseDto } from "../../../DTOs/User/user.dto";

export interface IGetUsersUseCase {
    execute(dto: GetUserDto): Promise<GetUserResponseDto>;
}
