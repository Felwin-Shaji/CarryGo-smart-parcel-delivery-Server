import { AuthUserDTO } from "../../../../Infrastructure/Types/types";
import { LoginDTO } from "../../../Dto/Auth/Auth.dto";

export interface ILoginUsecase {
  execute(loginData:LoginDTO): Promise<AuthUserDTO>;
}