import { inject, injectable } from "tsyringe";
import { IGetAddressesByPincodeUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IGetAddressesByPincodeUsecase";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { AddressResponseDTO } from "../../../Dto/User/Booking.dto";
import { AppError } from "../../../../Domain/utils/customError";
import { ADDRESS_MESSAGES } from "../../../../Infrastructure/constants/messages/addressMessages";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { AddressMapper } from "../../../Mappers/User/addressMapper";

@injectable()
export class GetAddressesByPincodeUsecase implements IGetAddressesByPincodeUsecase{
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository
    ){ }

    async execute(userId: string, pincode: string): Promise<AddressResponseDTO[]> {
        const addresses = await this._userRepo.findAddressByPincode(userId,pincode);

        if(!addresses) throw new AppError(ADDRESS_MESSAGES.ADDRESS_NOT_FOUND,STATUS.NOT_FOUND)

        return AddressMapper.toAddressResponseDTO(addresses)
    }
}