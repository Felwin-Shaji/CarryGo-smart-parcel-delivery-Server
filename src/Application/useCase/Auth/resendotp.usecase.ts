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
import { OTP_MESSAGES } from "../../../Infrastructure/constants/messages/otpMessage.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";


@injectable()
export class ResendOtpUseCase implements IResendOtpUseCase {

    constructor(
        @inject("IOtpRepository") private _otpRepo: IOtpRepository,

        @inject("IUserRepository") private _userRepo: IUserRepository,

        @inject("IMailService") private _mailer: IMailService
    ) { }

    async execute(dto: ResendOtpDTO): Promise<IOtpModel> {

        const existingOtp = await this._otpRepo.findOne({ email: dto.email });
        if (!existingOtp) throw new AppError(OTP_MESSAGES.SESSION_NOT_FOUND,STATUS.NOT_FOUND);


        const newOtp = this._otpRepo.generateOtp();
        console.log("resendOtp:", newOtp)
        const otpVo = await OtpVo.create(newOtp);

        existingOtp.otp = otpVo.value;
        existingOtp.expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        await this._otpRepo.findOneAndUpdate(
            { email: dto.email },
            {
                otp: otpVo.value,
                expiresAt: existingOtp.expiresAt
            }
        );

        await this._mailer.sendOTP(dto.email, newOtp);

        return existingOtp;
    }
}
