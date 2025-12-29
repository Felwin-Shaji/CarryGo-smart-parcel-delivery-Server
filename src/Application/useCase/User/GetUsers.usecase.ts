import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IGetUsersUseCase } from "../../interfaces/useCase_Interfaces/user/GetUsers.usecase";
import { GetUserDto, GetUserResponseDto } from "../../Dto/User/user.dto";
import { UserMapper } from "../../Mappers/User/userMapper";


@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {

    constructor(
        @inject("IUserRepository")
        private _userRepo: IUserRepository
    ) { }
    async execute(dto: GetUserDto): Promise<GetUserResponseDto> {

        const { page, limit, search, sortBy, sortOrder } = dto;

        const getUsersResult = await this._userRepo.getPaginatedUser(
            page,
            limit,
            search,
            sortBy,
            sortOrder
        );

        const responseData = UserMapper.toResponseDTO(getUsersResult);

        return responseData;
    }
}
