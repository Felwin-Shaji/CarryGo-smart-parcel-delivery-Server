import { Address } from "../../../../../Domain/Entities/User/Address";

export interface IGetUserAddressesUseCase {
  execute(userId: string): Promise<Address[]>;
}
