import { AuthUserDTO } from "../../../../Infrastructure/Types/CommonTypes";
import { LoginDTO } from "../../../DTOs/Auth/AuthDTO";

export interface ILoginUsecase {
  execute(loginData:LoginDTO): Promise<AuthUserDTO>;
}