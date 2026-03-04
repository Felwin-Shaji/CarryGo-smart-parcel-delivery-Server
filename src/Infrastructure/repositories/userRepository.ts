import { BaseRepository } from "./baseRepositories.js";
import type { User } from "../../Domain/Entities/User.js";
import type { IUserRepository } from "../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import { UserModel } from "../database/models/UserModels/userModel.js";
import { Address } from "../../Domain/Entities/User/Address.js";
import { AppError } from "../../Domain/utils/customError.js";
import { USER_MESSAGES } from "../constants/messages/userMessage.js";
import { STATUS } from "../constants/statusCodes.js";
import { AddressDBResult } from "../database/models/UserModels/AddressSchema.js";

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

        const sort: Record<string, 1 | -1> = {};
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

    async getUserById(userId: string): Promise<User> {
        const doc = await this.model.findById(userId);
        if (!doc) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        return doc as User;
    }

    async addAddress(userId: string, address: Address): Promise<void> {
        const user = await this.model.findById(userId);

        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        user.addresses.push(address);
        await user.save();
    };

    async getAddressById(userId: string, addressId: string): Promise<Address> {
        const user = await this.model.findOne(
            { _id: userId },
            { addresses: { $elemMatch: { _id: addressId } } }
        ).lean<{ addresses: AddressDBResult[] }>();

        if (!user || !user.addresses || user.addresses.length === 0) {
            throw new AppError("Address not found", STATUS.NOT_FOUND);
        };

        const addr = user.addresses[0];
        if (!addr) throw new AppError("Address not found", STATUS.NOT_FOUND);

        return new Address(
            addr._id.toString(),
            addr.label,
            addr.formattedAddress,
            addr.city,
            addr.state,
            addr.country,
            addr.pincode,
            addr.location,
            addr.isDefault,
            addr.isActive
        );


    }

    // async findAddressByPincode(
    //     userId: string,
    //     pincode: string
    // ): Promise<Address[]> {

    //     const user = await this.model
    //         .findById(userId, { addresses: 1 })
    //         .lean<{ addresses: AddressDBResult[] }>();

    //     if (!user || !user.addresses.length) return [];

    //     const addressByPincode = user.addresses
    //         .filter((addr) => addr.pincode === pincode)
    //         .map(
    //             (addr) =>
    //                 new Address(
    //                     addr._id.toString(),
    //                     addr.label,
    //                     addr.addressLine1,
    //                     addr.addressLine2 || null,
    //                     addr.city,
    //                     addr.state,
    //                     addr.country,
    //                     addr.pincode,
    //                     addr.formattedAddress || null,
    //                     addr.location,
    //                     addr.isDefault,
    //                     addr.isActive
    //                 )
    //         );


    //     return addressByPincode
    // }

}

