import { User } from "../../../../Domain/Entities/User";
import { Address } from "../../../../Domain/Entities/User/Address";
import { GetUsersDBResult } from "../../../Dto/User/user.dto";
import type { IBaseRepository } from "../base.repository";


export interface IUserRepository extends IBaseRepository<User> {
  getPaginatedUser(
    page: number,
    limit: number,
    search: string,
    sortBy: string,
    sortOrder: "asc" | "desc"
  ): Promise<GetUsersDBResult>

  addAddress(userId: string, address: Address): Promise<void>;
}
