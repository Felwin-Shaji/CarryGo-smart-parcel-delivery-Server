import { Role } from "../../../../Infrastructure/Types/types";

export interface IResetPasswordUseCase{
    execute(dto:{token:string,newPassword:string,role:Role}):Promise<void>;
} 