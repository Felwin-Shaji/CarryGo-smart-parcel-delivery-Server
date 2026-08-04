import { inject, injectable } from "tsyringe";
import { IAddUserAddressUseCase } from "../../../Interfaces/UseCases/User/Address/IAddUserAddressUseCase";
import { IUserRepository } from "../../../Interfaces/Repositories/User/IUserRepository";
import { addUserAddressRequestDTO } from "../../../DTOs/User/AddressDTO";
import { AddressMapper } from "../../../Mappers/User/AddressMapper";

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