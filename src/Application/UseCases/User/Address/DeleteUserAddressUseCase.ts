import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../Interfaces/Repositories/User/IUserRepository";
import { AppError } from "../../../../Domain/Utils/customError";
import { ADDRESS_MESSAGES } from "../../../../Infrastructure/Constants/Messages/addressMessages";
import { STATUS } from "../../../../Infrastructure/Constants/statusCodes";
import { IDeleteUserAddressUseCase } from "../../../Interfaces/UseCases/User/Address/IDeleteUserAddressUseCase";

@injectable()
export class DeleteUserAddressUseCase implements IDeleteUserAddressUseCase {
    constructor(
        @inject("IUserRepository")
        private userRepository: IUserRepository
    ) { };

    async execute(userId: string, addressId: string): Promise<void> {
        const user = await this.userRepository.findById({ _id: userId });
        if (!user) throw new AppError("User not found", 404);

        const address = user.addresses.find(
            (a) => a.id === addressId && a.isActive
        );

        if (!address) throw new AppError(ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, STATUS.NOT_FOUND);

        address.isActive = false;

        if (address.isDefault) {
            address.isDefault = false;
            const next = user.addresses.find((a) => a.isActive);
            if (next) next.isDefault = true;
        }

        await this.userRepository.findOneAndUpdate({ _id: userId }, {
            addresses: user.addresses,
        });
    }
}
