import type { IOtpModel } from "../../Domain/Entities/Iotp.js";
import type { Request } from "express";
import type { OtpResponseDTO, SendOtpDTO, VerifyOtpResponseDTO } from "../Dto/Auth/SendOtp.dto.js";
import type { Role, TokenObj } from "../../Infrastructure/Types/types.js";
import type { User } from "../../Domain/Entities/User.js";
import type { UserDTO } from "../Dto/Auth.js";

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

    static ToSendVerifyOtpResponse(id:string,name:string,email:string,role:Role):VerifyOtpResponseDTO{
        return {
            success:true,
            message:"user registered successfully",
            email,
            role,   
        }
    }
}