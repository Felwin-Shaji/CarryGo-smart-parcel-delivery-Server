import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { AppError } from "../../../../Domain/utils/customError";
import { ISetDefaultUserAddressUseCase } from "../../../interfaces/useCase_Interfaces/user/Address/ISetDefaultUserAddressUseCase";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { ADDRESS_MESSAGES } from "../../../../Infrastructure/constants/messages/addressMessages";

@injectable()
export class SetDefaultUserAddressUseCase implements ISetDefaultUserAddressUseCase {
    constructor(
        @inject("IUserRepository") private readonly userRepository: IUserRepository
    ) { }

    async execute(userId: string, addressId: string): Promise<void> {
        const user = await this.userRepository.findById({ _id: userId });

        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        let addressFound = false;

        user.addresses.forEach((address) => {
            if (!address.isActive) return;

            if (address.id === addressId) {
                address.isDefault = true;
                addressFound = true;
            } else {
                address.isDefault = false;
            }
        });

        if (!addressFound) throw new AppError(ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, STATUS.NOT_FOUND);

        await this.userRepository.findOneAndUpdate({ _id: userId }, {
            addresses: user.addresses,
        });
    }
}
