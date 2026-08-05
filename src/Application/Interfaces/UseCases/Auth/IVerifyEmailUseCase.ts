import { Role } from "../../../../Infrastructure/Types/CommonTypes";

export interface IVarifyEmailUseCase {
    execute(dto:{email: string, role: Role}): Promise<string | null>;
}