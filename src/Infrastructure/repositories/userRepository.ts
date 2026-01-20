import type { FlattenMaps, Model } from "mongoose";
import { BaseRepository } from "./baseRepositories.js";
import type { User } from "../../Domain/Entities/User.js";
import type { IUserRepository } from "../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import { UserModel } from "../database/models/UserModels/userModel.js";
import { Address } from "../../Domain/Entities/User/Address.js";
import { AppError } from "../../Domain/utils/customError.js";
import { USER_MESSAGES } from "../constants/messages/userMessage.js";
import { STATUS } from "../constants/statusCodes.js";

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
    };

    async addAddress(userId: string, address: Address): Promise<void> {
        const user = await this.model.findById(userId);

        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        user.addresses.push(address);
        await user.save();
    };

    async findAddressByPincode(
        userId: string,
        pincode: string
    ): Promise<Address[]> {

        const user = await this.model
            .findById(userId, { addresses: 1 })
            .lean();

        if (!user || !user.addresses.length) return [];

        const addressByPincode = user.addresses
            .filter((addr) => addr.pincode === pincode)
            .map(
                (addr) =>
                    new Address(
                        addr.id,
                        addr.label,
                        addr.addressLine1,
                        addr.addressLine2 || null,
                        addr.city,
                        addr.state,
                        addr.country,
                        addr.pincode,
                        addr.formattedAddress || null,
                        addr.location,
                        addr.isDefault,
                        addr.isActive
                    )
            );


        return addressByPincode
    }

}

