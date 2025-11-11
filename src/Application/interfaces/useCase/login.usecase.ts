import type { AuthUser} from "../../../Infrastructure/Types/types.js";
import type { LoginDTO } from "../../Dto/Auth/Auth.dto.js";


export interface ILoginUsecase {
  execute(loginData:LoginDTO): Promise<AuthUser>;
}