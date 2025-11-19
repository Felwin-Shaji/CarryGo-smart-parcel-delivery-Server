import { Role, TokenObj } from "../../../../Infrastructure/Types/types";

export interface IGenerateTokenUseCase {
    execute(userId: string, email: string, role: Role): Promise<TokenObj>;
}