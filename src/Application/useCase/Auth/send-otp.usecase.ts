import type { IOtpModel } from "../../../Domain/Entities/Iotp";
import type { IOtpRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import type { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import type { OtpResponseDTO, SendOtpDTO } from "../../Dto/Auth/Auth.dto";
import { ISendOtpUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/requestOtp.usecase";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { OTP_MESSAGES } from "../../../Infrastructure/constants/messages/otpMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
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
