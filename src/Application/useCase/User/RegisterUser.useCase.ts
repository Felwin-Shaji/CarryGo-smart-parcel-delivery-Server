import { inject, injectable } from "tsyringe";
import { User } from "../../../Domain/Entities/User";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import type { UserDTO } from "../../Dto/Auth/Auth.dto";
import type { IRegisterUserUseCase } from "../../interfaces/useCase_Interfaces/user/RegisterUser.useCase";


@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject("IUserRepository") private _userRepo: IUserRepository,
  ) { }

  async execute(userData: UserDTO) {

    const newUser = new User(
      null,
      userData.name,
      userData.email,
      userData.mobile || null,
      userData.password || null,
      userData.role,
      null,
      "local",
      "PENDING",
      null,
      0,
      false
    );

    const savedUser = await this._userRepo.save(newUser);

    return savedUser;
  };
};
