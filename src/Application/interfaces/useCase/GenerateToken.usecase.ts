import type { Role, TokenObj } from "../../../Infrastructure/Types/types.js";

export interface IGenerateTokenUseCase {
    execute(userId: string, email: string, role: Role): Promise<TokenObj>;
}