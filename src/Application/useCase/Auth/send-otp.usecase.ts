import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";
import type { IOtpRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository.js";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { IMailService } from "../../interfaces/services_Interfaces/email-service.interface.js";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError.js";
import type { SendOtpDTO } from "../../Dto/Auth/Auth.dto.js";
import { ISendOtpUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/requestOtp.usecase.js";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface.js";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface.js";
import { OTP_MESSAGES } from "../../../Infrastructure/constants/messages/otpMessage.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";

@injectable()
export class SendOtpUseCase implements ISendOtpUseCase {
  constructor(
    @inject("IOtpRepository") private _otpRepo: IOtpRepository,

    @inject("IUserRepository") private _userRepo: IUserRepository,

    @inject("IMailService") private _mailer: IMailService,

    @inject("IPasswordService") private _passwordService: IPasswordService,

    @inject("IOtpService") private _otpService: IOtpService
  ) { };

  async execute(otpData: SendOtpDTO): Promise<IOtpModel> {

    const hashedPassword = await this._passwordService.hashPassword(otpData.password)


    const existingUser = await this._userRepo.findOne({ email: otpData.email });
    if (existingUser) throw new AppError(OTP_MESSAGES.USER_ALREADY_REGISTERED, STATUS.BAD_REQUEST);

    const existingOtp = await this._otpRepo.findOne({ email: otpData.email });
    if (existingOtp) throw new AppError(OTP_MESSAGES.OTP_ALREADY_SENT, STATUS.BAD_REQUEST);

    const otp = this._otpService.generateOtp()
    console.log("otp :", otp);
    const hashedOtp = await this._otpService.hashOtp(otp)

    const otpDomain: IOtpModel = {
      name: otpData.name,
      email: otpData.email,
      mobile: otpData.mobile || null,
      password: hashedPassword ?? null,
      otp: hashedOtp,
      role: otpData.role,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000)
    };

    await this._otpRepo.save(otpDomain);
    await this._mailer.sendOTP(otpData.email, otp);
    return otpDomain
  };
};
