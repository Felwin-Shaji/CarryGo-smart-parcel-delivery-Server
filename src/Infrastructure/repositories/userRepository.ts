import type { Model } from "mongoose";
import { BaseRepository } from "./baseRepositories.js";
import type { User } from "../../Domain/Entities/User.js";
import type { IUserRepository } from "../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import { UserModel } from "../database/models/UserModels/userModel.js";

export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor() {
        super(UserModel)
    }

    async getPaginatedUser(
        page: number,
        limit: number,
        search: string,
        sortBy: string,
        sortOrder: "asc" | "desc"
    ) {
        const skip = (page - 1) * limit;

        const filter = search
            ? {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { mobile: { $regex: search, $options: "i" } },
                ],
            }
            : {};

        const sort: any = {};
        if (sortBy) sort[sortBy] = sortOrder === "asc" ? 1 : -1;

        const [data, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit),
            this.model.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}