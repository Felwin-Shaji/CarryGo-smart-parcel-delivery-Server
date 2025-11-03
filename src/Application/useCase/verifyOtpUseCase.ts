import { inject, injectable } from "tsyringe";
import type { IVerifyOtpUseCase } from "../interfaces/useCase/verifyOtp.interface.js";
import type { IOtpRepository } from "../interfaces/repositories/auth/otp.repository.js";
import type { IUserRepository } from "../interfaces/repositories/user/user.repository.js";
import logger from "../../Infrastructure/logger/logger.js";
import { OtpVo } from "../../Domain/ValueObjects/otp.valueObject.js";
import { User } from "../../Domain/Entities/User.js";




@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
    constructor(
        @inject("IOtpRepository") private otpRepo: IOtpRepository,
        @inject("IUserRepository") private userRepo: IUserRepository
    ) { }

    async execute(otp: string, email: string): Promise<void> {
        try {
            const otpData = await this.otpRepo.findOne({ email });

            if (!otpData) {
                throw new Error("OTP not found or expired.");
            }
            const { name, mobile, password } = otpData

            const savedOtp = new OtpVo(otpData.otp);
            const isOtpSame = await savedOtp.compare(otp);

            if (!isOtpSame) {
                throw new Error("Invalid OTP");
            }



            const newUser = new User(
                null,
                name,
                email,
                mobile ?? null,
                password ?? null,
                null,
                "local",
                "pending",
                0,
                false
            );

            await this.userRepo.save(newUser);

            await this.otpRepo.delete({ email }); 

            logger.info(`User registered successfully with email: ${email}`);
        } catch (error) {
            logger.error("UserRegisterUseCase error:", error);
            throw error;
        }
    }
}