import type { User } from "../../../../Domain/Entities/User.js";
import type { UserDTO } from "../../../DTOs/Auth/AuthDTO.js";



export interface IRegisterUserUseCase {
    execute(userData:UserDTO): Promise<User>;
}