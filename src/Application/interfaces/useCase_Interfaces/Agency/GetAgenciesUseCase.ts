import { Agency } from "../../../../Domain/Entities/Agency/Agency";

export interface IGetAgenciesUseCase {
    execute(input: {
        page: number;
        limit: number;
        search: string;
        sortBy: string;
        sortOrder: "asc" | "desc";
    }): Promise<{
        data: Agency[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
