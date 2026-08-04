import { User } from "../../../../Domain/Entities/User";

export interface GoogleAuthResponseDTO {
    users: Partial<User>;
    accessToken: string;
    refreshToken: string;
}

export interface IGoogleAuthUseCase {
    execute(
        credential: string
    ): Promise<GoogleAuthResponseDTO>;
}