import type { IOtpModel } from "../../Domain/Entities/Iotp.js";
import type { Request } from "express";
import type { LoginDTO, OtpResponseDTO, SendLoginResponse, SendOtpDTO, VerifyOtpResponseDTO } from "../Dto/Auth/Auth.dto.js";
import type { Role } from "../../Infrastructure/Types/types.js";

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

    static ToSendVerifyOtpResponse(id: string, name: string, email: string, role: Role, accessToken: string): VerifyOtpResponseDTO {
        return {
            success: true,
            message: "user registered successfully",
            user: {
                id,
                name,
                email,
                role,
            },
            accessToken: accessToken
        }
    }

    static toLoginDTO(req: Request): LoginDTO {
        const { email, password, role } = req.body;
        return { email, password, role }
    }

    static ToSendLoginResponse(id: string, name: string, email: string, role: Role, accessToken: string): SendLoginResponse {
        return {
            success: true,
            message: "user logged in successfully",
            user: {
                id,
                name,
                email,
                role,
            },
            accessToken: accessToken
        }
    }
}