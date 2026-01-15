import { inject, injectable } from "tsyringe";
import { IAddUserAddressUseCase } from "../../../interfaces/useCase_Interfaces/user/Address/IAddUserAddressUseCase";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { addUserAddressRequestDTO } from "../../../Dto/User/address.dto";
import { AddressMapper } from "../../../Mappers/User/addressMapper";

@injectable()
export class AddUserAddressUseCase implements IAddUserAddressUseCase {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
    ) { }   
    async execute(userId: string, dto: addUserAddressRequestDTO): Promise<void> {

        const address = AddressMapper.toAddressEntity(dto);

        await this.userRepository.addAddress(userId, address);
    }
}