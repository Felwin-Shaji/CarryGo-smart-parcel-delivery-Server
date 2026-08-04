import { AuthUserDTO } from "../../../../Infrastructure/Types/types";
import { LoginDTO } from "../../../DTOs/Auth/Auth.dto";

export interface ILoginUsecase {
  execute(loginData:LoginDTO): Promise<AuthUserDTO>;
}