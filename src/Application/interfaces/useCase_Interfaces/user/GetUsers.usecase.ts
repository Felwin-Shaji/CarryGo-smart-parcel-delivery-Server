import { User } from "../../../../Domain/Entities/User";

export interface IGetUsersUseCase {
    execute(input: {
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
    }>;
}
