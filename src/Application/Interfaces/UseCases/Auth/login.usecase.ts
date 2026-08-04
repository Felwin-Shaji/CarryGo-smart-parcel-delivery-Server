import { AuthUserDTO } from "../../../../Infrastructure/Types/types";
import { LoginDTO } from "../../../DTOs/Auth/AuthDTO";

export interface ILoginUsecase {
  execute(loginData:LoginDTO): Promise<AuthUserDTO>;
}