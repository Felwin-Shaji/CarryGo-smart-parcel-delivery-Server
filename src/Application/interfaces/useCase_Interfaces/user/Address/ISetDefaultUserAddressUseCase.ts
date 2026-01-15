export interface ISetDefaultUserAddressUseCase {
  execute(userId: string, addressId: string): Promise<void>;
};