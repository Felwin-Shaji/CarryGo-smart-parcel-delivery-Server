import { GetUserDto, GetUserResponseDto } from "../../../DTOs/User/UserDTO";

export interface IGetUsersUseCase {
    execute(dto: GetUserDto): Promise<GetUserResponseDto>;
}
