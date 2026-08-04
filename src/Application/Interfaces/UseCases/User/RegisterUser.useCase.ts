import type { User } from "../../../../Domain/Entities/User.js";
import type { UserDTO } from "../../../DTOs/Auth/Auth.dto.js";



export interface IRegisterUserUseCase {
    execute(userData:UserDTO): Promise<User>;
}