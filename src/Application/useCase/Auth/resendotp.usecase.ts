import { inject, injectable } from "tsyringe";
import type { IOtpRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository.js";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { IMailService } from "../../interfaces/services_Interfaces/email-service.interface.js";
import { EmailVo } from "../../../Domain/ValueObjects/Email.valueObject.js";
import { AppError } from "../../../Domain/utils/customError.js";
import { OtpVo } from "../../../Domain/ValueObjects/otp.valueObject.js";
import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";
import type { ResendOtpDTO } from "../../Dto/Auth/Auth.dto.js";
import { IResendOtpUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resendOtp.usecase.js";


@injectable()
export class ResendOtpUseCase implements IResendOtpUseCase {

    constructor(
        @inject("IOtpRepository")
        private otpRepo: IOtpRepository,

        @inject("IUserRepository")
        private userRepo: IUserRepository,

        @inject("IMailService")
        private mailer: IMailService
    ) { }

    async execute(dto: ResendOtpDTO): Promise<IOtpModel> {

        const existingOtp = await this.otpRepo.findOne({ email: dto.email });
        if (!existingOtp) throw new AppError("No OTP session found for this email");


        const newOtp = this.otpRepo.generateOtp();
        console.log("resendOtp:",newOtp)
        const otpVo = await OtpVo.create(newOtp);

        existingOtp.otp = otpVo.value;
        existingOtp.expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        await this.otpRepo.findOneAndUpdate(
            { email: dto.email },
            {
                otp: otpVo.value,
                expiresAt: existingOtp.expiresAt
            }
        );

        await this.mailer.sendOTP(dto.email , newOtp);

        return existingOtp;
    }
}
