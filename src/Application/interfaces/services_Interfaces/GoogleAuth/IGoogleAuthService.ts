import { GoogleUserDTO } from "../../../Dto/Auth/Auth.dto";

export interface IGoogleAuthService {
    verifyGoogleToken(credential: string): Promise<GoogleUserDTO>;
};