import { addUserAddressRequestDTO } from "../../../../DTOs/User/address.dto";

export interface IAddUserAddressUseCase {
  execute(userId: string, dto:addUserAddressRequestDTO): Promise<void>;
};
