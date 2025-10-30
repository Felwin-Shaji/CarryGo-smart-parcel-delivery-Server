import type { Model } from "mongoose";
import { BaseRepository } from "./baseRepositories.js";
import type { User } from "../../Domain/Entities/User.js";
import { UserModel } from "../database/models/userModel.js";

// @injectable()
export class UserRepository<T> extends BaseRepository<User> {
    constructor() {
        super(UserModel)
    }
}