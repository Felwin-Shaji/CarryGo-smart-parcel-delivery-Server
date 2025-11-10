import { inject, injectable } from "tsyringe";
import { User } from "../../Domain/Entities/User.js";
import type { IUserRepository } from "../interfaces/repositories/user/user.repository.js";
import type { IRegisterUserUseCase } from "../interfaces/useCase/RegisterUser.useCase.js";
import type { UserDTO } from "../Dto/Auth.js";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject("IUserRepository") private userRepo: IUserRepository
  ) {}

  async execute(userData:UserDTO) {

    const newUser = new User(
      null,
      userData.name,
      userData.email,
      userData.mobile || null,
      userData.password || null,
      userData.role,
      null,
      "local",
      "pending",
      0,
      false
    );

    const savedUser = await this.userRepo.save(newUser);

    return savedUser;
  }
}
