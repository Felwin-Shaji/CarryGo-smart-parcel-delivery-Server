import { User } from "../../Domain/Entities/User"
import type { IOtpModel } from "../../Domain/Entities/Iotp";
import type { GoogleUserDTO, OtpResponseDTO, SendLogoutResponseDTO, SendOtpDTO, VerifyOtpResponseDTO } from "../Dto/Auth/Auth.dto";
import type { KYCStatus, Role } from "../../Infrastructure/Types/types";

export class AuthMapper {

    static toOtpDomain(otpData: SendOtpDTO, hashedPassword: string, hashedOtp: string): IOtpModel {
        return {
            name: otpData.name,
            email: otpData.email,
            mobile: otpData.mobile || null,
            password: hashedPassword ?? null,
            otp: hashedOtp,
            role: otpData.role,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000)
        };
    }

    static toSendOtpResponse(result: IOtpModel): OtpResponseDTO {
        return {
            email: result.email,
            role: result.role,
            expiresAt: result.expiresAt.getTime(),
        }
    };

    static ToSendVerifyOtpResponse(id: string, name: string, email: string, role: Role, kycStatus: KYCStatus, accessToken: string): VerifyOtpResponseDTO {
        return {
            success: true,
            message: "user registered successfully",
            user: {
                id,
                name,
                email,
                role,
                kycStatus,

                accessToken: accessToken
            },
        }
    };

    static toCreateGoogleUser(googleUser: GoogleUserDTO): User {
        return new User(
            null,
            googleUser.name,
            googleUser.email,
            null,
            null,
            "user",
            googleUser.googleId,
            "google",
        );
    }

    static toGoogleAuthResponse(
        user: User,
        accessToken: string
    ) {

        return {
            success: true,

            data: {
                users: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    kycStatus: user.kycStatus || null,
                },

                accessToken,
            },
        };
    }

    static toSendLogoutResponse(): SendLogoutResponseDTO {
        return {
            success: true,
            message: "Logout successful",
        }
    }
}