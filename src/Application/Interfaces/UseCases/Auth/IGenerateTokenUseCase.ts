import { Role, TokenObj } from "../../../../Infrastructure/Types/CommonTypes";

export interface IGenerateTokenUseCase {
    execute(userId: string, email: string, role: Role, tokenVersion: number): Promise<TokenObj>;
}