import type { User } from "../../../Domain/Entities/User.js";
import type { UserDTO } from "../../Dto/Auth.js";

export interface IRegisterUserUseCase {
    execute(userData:UserDTO): Promise<User>;
}