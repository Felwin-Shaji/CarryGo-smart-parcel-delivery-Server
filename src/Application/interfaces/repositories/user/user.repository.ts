
import type { User } from "../../../../Domain/Entities/User.js";
import type { IBaseRepository } from "../base.repository.js";

export interface IUserRepository extends IBaseRepository<User> {
}
