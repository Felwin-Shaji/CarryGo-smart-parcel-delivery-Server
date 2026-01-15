import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import { IGetUserAddressesUseCase } from "../../../interfaces/useCase_Interfaces/user/Address/IGetUserAddressesUseCase.js";
import { AppError } from "../../../../Domain/utils/customError.js";

@injectable()
export class GetUserAddressesUseCase implements IGetUserAddressesUseCase {
  constructor(
    @inject("IUserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById({_id:userId});

    if (!user) throw new AppError("User not found", 404);

    return user.addresses
      .filter((addr) => addr.isActive)
      .sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
  }
}
