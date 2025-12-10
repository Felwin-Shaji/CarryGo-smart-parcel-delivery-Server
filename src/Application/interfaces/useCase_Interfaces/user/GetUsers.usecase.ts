import { GetUserDto, GetUserResponseDto } from "../../../Dto/User/user.dto";

export interface IGetUsersUseCase {
    execute(dto: GetUserDto): Promise<GetUserResponseDto>;
}
