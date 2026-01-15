import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import { AppError } from "../../../../Domain/utils/customError.js";
import { ADDRESS_MESSAGES } from "../../../../Infrastructure/constants/messages/addressMessages.js";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes.js";
import { IDeleteUserAddressUseCase } from "../../../interfaces/useCase_Interfaces/user/Address/IDeleteUserAddressUseCase.js";

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
