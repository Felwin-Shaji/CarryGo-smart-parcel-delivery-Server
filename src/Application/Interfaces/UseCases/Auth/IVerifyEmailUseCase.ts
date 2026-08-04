import { Role } from "../../../../Infrastructure/Types/types";

export interface IVarifyEmailUseCase {
    execute(dto:{email: string, role: Role}): Promise<string | null>;
}