import { GoogleUserDTO } from "../../../DTOs/Auth/Auth.dto";

export interface IGoogleAuthService {
    verifyGoogleToken(credential: string): Promise<GoogleUserDTO>;
};