import { GoogleUserDTO } from "../../../DTOs/Auth/AuthDTO";

export interface IGoogleAuthService {
    verifyGoogleToken(credential: string): Promise<GoogleUserDTO>;
};