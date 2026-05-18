import { OAuth2Client } from "google-auth-library";
import { IGoogleAuthService } from "../../../Application/interfaces/services_Interfaces/GoogleAuth/IGoogleAuthService";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../constants/statusCodes";
import { AUTH_MESSAGES } from "../../constants/messages/authMessages";
import { injectable } from "tsyringe";

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(
    GOOGLE_CLIENT_ID
);

@injectable()
export class GoogleAuthService implements IGoogleAuthService {

    async verifyGoogleToken(credential: string) {

        if (!credential) throw new AppError(AUTH_MESSAGES.GOOGLE_CREDENTIAL_REQUIRED, STATUS.BAD_REQUEST);

        if (!GOOGLE_CLIENT_ID) throw new AppError(AUTH_MESSAGES.GOOGLE_CLIENT_ID_MISSING, STATUS.INTERNAL_SERVER_ERROR);

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) throw new AppError(AUTH_MESSAGES.GOOGLE_TOKEN_INVALID, STATUS.BAD_REQUEST);
        if (!payload.email) throw new AppError(AUTH_MESSAGES.GOOGLE_EMAIL_NOT_FOUND, STATUS.BAD_REQUEST);
        if (!payload.email_verified) throw new AppError(AUTH_MESSAGES.GOOGLE_EMAIL_NOT_VERIFIED, STATUS.BAD_REQUEST);

        return {
            googleId: payload.sub,
            name: payload.name || "",
            email: payload.email,
            authProvider: "google" as const,
            emailVerified: payload.email_verified,
        };

    }
}