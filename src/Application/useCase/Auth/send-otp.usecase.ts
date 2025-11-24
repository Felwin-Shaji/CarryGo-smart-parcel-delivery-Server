import { EmailVo } from "../../../Domain/ValueObjects/Email.valueObject.js";
import { PasswordVo } from "../../../Domain/ValueObjects/password.valueObject.js";
import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";
import type { IOtpRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository.js";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { IMailService } from "../../interfaces/services_Interfaces/email-service.interface.js";
// import type { ISendOtpUseCase } from "../interfaces/useCase_Interfaces/requestOtp.usecase.js";
import { OtpVo } from "../../../Domain/ValueObjects/otp.valueObject.js";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError.js";
import type { SendOtpDTO } from "../../Dto/Auth/Auth.dto.js";
import { ISendOtpUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/requestOtp.usecase.js";

@injectable()
export class SendOtpUseCase implements ISendOtpUseCase {
  constructor(
    @inject("IOtpRepository")
    private otpRepo: IOtpRepository,

    @inject("IUserRepository")
    private userRepo: IUserRepository,

    @inject("IMailService")
    private mailer: IMailService
  ) { };

  async execute(otpData: SendOtpDTO): Promise<IOtpModel> {

    const passwordVo = await PasswordVo.create(otpData.password);
    if (!passwordVo) throw new AppError("Invalid password");


    const existingUser = await this.userRepo.findOne({ email: otpData.email});
    if (existingUser) throw new AppError("User already registered");

    const existingOtp = await this.otpRepo.findOne({ email: otpData.email});
    if (existingOtp) throw new AppError("Please wait until the current OTP expires before requesting a new one.");

    const otp = this.otpRepo.generateOtp();
    console.log(otp);
    const otpVo = await OtpVo.create(otp);

    const otpDomain: IOtpModel = {
      name: otpData.name,
      email: otpData.email,
      mobile: otpData.mobile || null,
      password: passwordVo.value ?? null,
      otp: otpVo.value,
      role: otpData.role,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000)
    };

    await this.otpRepo.save(otpDomain);
    await this.mailer.sendOTP(otpData.email, otp);
    return otpDomain
  };
};
