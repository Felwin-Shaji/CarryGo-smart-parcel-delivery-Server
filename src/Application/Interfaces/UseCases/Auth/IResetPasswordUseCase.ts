import { Role } from "../../../../Infrastructure/Types/CommonTypes";

export interface IResetPasswordUseCase{
    execute(dto:{token:string,newPassword:string,role:Role}):Promise<void>;
} 