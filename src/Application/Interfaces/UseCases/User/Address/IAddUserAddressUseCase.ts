import { addUserAddressRequestDTO } from "../../../../DTOs/User/AddressDTO";

export interface IAddUserAddressUseCase {
  execute(userId: string, dto:addUserAddressRequestDTO): Promise<void>;
};
