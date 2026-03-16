import { inject, injectable } from "tsyringe";
import type { IOtpRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import type { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { OtpVo } from "../../../Domain/ValueObjects/otp.valueObject";
import type { OtpResponseDTO, ResendOtpDTO } from "../../Dto/Auth/Auth.dto";
import { IResendOtpUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resendOtp.usecase";
import { OTP_MESSAGES } from "../../../Infrastructure/constants/messages/otpMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AuthMapper } from "../../Mappers/AuthMapper";


@injectable()
export class ResendOtpUseCase implements IResendOtpUseCase {

    constructor(
        @inject("IOtpRepository") private _otpRepo: IOtpRepository,

        @inject("IUserRepository") private _userRepo: IUserRepository,

        @inject("IMailService") private _mailer: IMailService
    ) { }

    async execute(dto: ResendOtpDTO): Promise<OtpResponseDTO> {

        const existingOtp = await this._otpRepo.findOne({ email: dto.email });
        if (!existingOtp) throw new AppError(OTP_MESSAGES.SESSION_NOT_FOUND,STATUS.NOT_FOUND);


        const newOtp = this._otpRepo.generateOtp();
        console.log("resendOtp:", newOtp)
        const otpVo = await OtpVo.create(newOtp);

        existingOtp.otp = otpVo.value;
        existingOtp.expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        const updateOtp = await this._otpRepo.findOneAndUpdate(
            { email: dto.email },
            {
                otp: otpVo.value,
                expiresAt: existingOtp.expiresAt
            }
        );

        if(!updateOtp) throw new AppError(OTP_MESSAGES.OTP_RESEND_FAILED, STATUS.NOT_FOUND);

        await this._mailer.sendOTP(dto.email, newOtp);

        return AuthMapper.toSendOtpResponse(updateOtp);
    }
}
