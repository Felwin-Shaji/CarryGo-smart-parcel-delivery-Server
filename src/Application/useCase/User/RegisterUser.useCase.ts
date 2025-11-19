import { inject, injectable } from "tsyringe";
import { User } from "../../../Domain/Entities/User.js";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { UserDTO } from "../../Dto/Auth/Auth.dto.js";
import type { IRegisterUserUseCase } from "../../interfaces/useCase_Interfaces/user/RegisterUser.useCase.js";


@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject("IUserRepository") private userRepo: IUserRepository,
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
      0,
      false
    );

    const savedUser = await this.userRepo.save(newUser);

    return savedUser;
  };
};
