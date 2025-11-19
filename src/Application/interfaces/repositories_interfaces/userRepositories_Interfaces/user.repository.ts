import { User } from "../../../../Domain/Entities/User";
import type { IBaseRepository } from "../base.repository";

export interface IUserRepository extends IBaseRepository<User> {
  getPaginatedUser(
    page: number,
    limit: number,
    search: string,
    sortBy: string,
    sortOrder: "asc" | "desc"
  ): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}
