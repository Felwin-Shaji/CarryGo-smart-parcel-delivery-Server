import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import { IGetUsersUseCase } from "../../Interfaces/UseCases/User/IGetUsersUseCase";
import { GetUserDto, GetUserResponseDto } from "../../DTOs/User/UserDTO";
import { UserMapper } from "../../Mappers/User/UserMapper";


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
