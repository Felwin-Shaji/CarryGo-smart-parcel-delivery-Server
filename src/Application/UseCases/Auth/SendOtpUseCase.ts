import type { IOtpRepository } from "../../Interfaces/Repositories/Auth/IOTPRepository";
import type { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import type { IMailService } from "../../Interfaces/Services/IEmailService";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import type { OtpResponseDTO, SendOtpDTO } from "../../DTOs/Auth/AuthDTO";
import { ISendOtpUseCase } from "../../Interfaces/UseCases/Auth/ISendOtpUseCase";
import { IPasswordService } from "../../Interfaces/Services/IPasswordService";
import { IOtpService } from "../../Interfaces/Services/IOTPService";
import { OTP_MESSAGES } from "../../../Infrastructure/Constants/Messages/otpMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { AuthMapper } from "../../Mappers/AuthMapper";

@injectable()
export class SendOtpUseCase implements ISendOtpUseCase {
  constructor(
    @inject("IOtpRepository") private _otpRepo: IOtpRepository,

    @inject("IUserRepository") private _userRepo: IUserRepository,

    @inject("IMailService") private _mailer: IMailService,

    @inject("IPasswordService") private _passwordService: IPasswordService,

    @inject("IOtpService") private _otpService: IOtpService
  ) { };

  async execute(otpData: SendOtpDTO): Promise<OtpResponseDTO> {

    const hashedPassword = await this._passwordService.hashPassword(otpData.password)


    const existingUser = await this._userRepo.findOne({ email: otpData.email });
    if (existingUser) throw new AppError(OTP_MESSAGES.USER_ALREADY_REGISTERED, STATUS.BAD_REQUEST);

    const existingOtp = await this._otpRepo.findOne({ email: otpData.email });
    if (existingOtp) throw new AppError(OTP_MESSAGES.OTP_ALREADY_SENT, STATUS.BAD_REQUEST);

    const otp = this._otpService.generateOtp()
    console.log("otp :", otp);
    const hashedOtp = await this._otpService.hashOtp(otp)

    const otpDomain = AuthMapper.toOtpDomain(otpData, hashedPassword, hashedOtp);

    const savedOtp = await this._otpRepo.save(otpDomain);
    await this._mailer.sendOTP(otpData.email, otp);

    return AuthMapper.toSendOtpResponse(savedOtp);
  };
};
