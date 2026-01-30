import { Role } from "../../../../Infrastructure/Types/types";

export interface ValidateSessionDTO {
    userId: string;
    role: Role;
    tokenVersion: number;
}


export interface IValidateSessionUseCase {
    execute(input: ValidateSessionDTO): Promise<void>;
}
