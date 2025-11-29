import type { IOtpModel } from "../../Domain/Entities/Iotp.js";
import type { Request } from "express";
import type { LoginDTO, LogoutDTO, OtpResponseDTO, ResendOtpDTO, SendLoginResponse, SendLogoutResponseDTO, SendOtpDTO, VerifyOtpResponseDTO } from "../Dto/Auth/Auth.dto.js";
import type { KYCStatus, Role } from "../../Infrastructure/Types/types.js";

export class AuthMapper {

    static toSendOtpDTO(req: Request): SendOtpDTO {
        const { name, email, mobile, password, role } = req.body;
        return { name, email, mobile, password, role };
    }

    static toSendOtpResponse(result: IOtpModel): OtpResponseDTO {
        return {
            success: true,
            message: "Otp sent successfully",
            email: result.email,
            role: result.role,
            expiresAt: result.expiresAt!,
        }
    }

    static toResendOtpDTO(req:Request):ResendOtpDTO{
        return {
            email:req.body.email,
            role:req.body.role
        }
    }

    static ToSendVerifyOtpResponse(id: string, name: string, email: string, role: Role, kycStatus: KYCStatus, accessToken: string): VerifyOtpResponseDTO {
        return {
            success: true,
            message: "user registered successfully",
            user: {
                id,
                name,
                email,
                role,
                kycStatus

            },
            accessToken: accessToken
        }
    }

    static toLoginDTO(req: Request): LoginDTO {
        const { email, password, role } = req.body;
        return { email, password, role }
    }

    static ToSendLoginResponse(id: string, name: string, email: string, role: Role, kycStatus: KYCStatus, accessToken: string): SendLoginResponse {
        return {
            success: true,
            message: "user logged in successfully",
            user: {
                id,
                name,
                email,
                role,
                kycStatus:kycStatus||null
            },
            accessToken: accessToken
        }
    }

    static toLogoutDTO(req: Request): LogoutDTO {
        const { role, userId } = req.body;
        return { role, id: userId }
    }

    static toSendLogoutResponse(): SendLogoutResponseDTO {
        return {
            success: true,
            message: "Logout successful",
        }
    }
}