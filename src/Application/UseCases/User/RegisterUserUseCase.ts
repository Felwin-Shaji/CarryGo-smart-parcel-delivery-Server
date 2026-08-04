import { inject, injectable } from "tsyringe";
import { User } from "../../../Domain/Entities/User";
import type { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import type { UserDTO } from "../../DTOs/Auth/AuthDTO";
import type { IRegisterUserUseCase } from "../../Interfaces/UseCases/User/IRegisterUserUseCase";


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
