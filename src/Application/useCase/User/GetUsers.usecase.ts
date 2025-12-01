import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { User } from "../../../Domain/Entities/User";
import { IGetUsersUseCase } from "../../interfaces/useCase_Interfaces/user/GetUsers.usecase";

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {

    constructor(
        @inject("IUserRepository")
        private _userRepo: IUserRepository
    ) { }
    async execute(input: {
        page: number;
        limit: number;
        search: string;
        sortBy: string;
        sortOrder: "asc" | "desc";
    }): Promise<{
        data: User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const { page, limit, search, sortBy, sortOrder } = input;

        return await this._userRepo.getPaginatedUser(
            page,
            limit,
            search,
            sortBy,
            sortOrder
        );
    }
}
