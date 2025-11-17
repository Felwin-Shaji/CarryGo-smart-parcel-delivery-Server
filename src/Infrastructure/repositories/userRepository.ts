import type { Model } from "mongoose";
import { BaseRepository } from "./baseRepositories.js";
import type { User } from "../../Domain/Entities/User.js";
import type { IUserRepository } from "../../Application/interfaces/repositories/user/user.repository.js";
import { UserModel } from "../database/models/UserModels/userModel.js";

export class UserRepository<T> extends BaseRepository<User> implements IUserRepository {
    constructor() {
        super(UserModel)
    }
}