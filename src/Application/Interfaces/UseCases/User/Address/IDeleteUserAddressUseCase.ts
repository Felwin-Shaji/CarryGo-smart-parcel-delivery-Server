export interface IDeleteUserAddressUseCase {
  execute(userId: string, addressId: string): Promise<void>;
}
