import { EmailVo } from "../../Domain/ValueObjects/Email.valueObject.js";
import { PasswordVo } from "../../Domain/ValueObjects/password.valueObject.js";
import type { IOtpModel } from "../../Domain/Entities/Iotp.js";
import type { IOtpRepository } from "../interfaces/repositories/auth/otp.repository.js";
import type { IUserRepository } from "../interfaces/repositories/user/user.repository.js";
import type { IMailService } from "../interfaces/services/email.service.js";
import type { ISendOtpUseCase } from "../interfaces/useCase/requestOtp.usecase.js";
import logger from "../../Infrastructure/logger/logger.js";
import { OtpVo } from "../../Domain/ValueObjects/otp.valueObject.js";
import type { UserDTO } from "../Dto/Auth.js";
import { inject, injectable } from "tsyringe";

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

  async execute(otpData: UserDTO): Promise<IOtpModel> {

    try {
      const emailVO = EmailVo.create(otpData.email);
      const passwordVo = await PasswordVo.create(otpData.password);

      const existingUser = await this.userRepo.findOne({ email: emailVO.value });
      if (existingUser) throw new Error("User already registered");

      const existingOtp = await this.otpRepo.findOne({ email: emailVO.value });
      if (existingOtp) throw new Error("Please wait until the current OTP expires before requesting a new one.");

      const otp = this.otpRepo.generateOtp();
      console.log(otp)
      const otpVo = await OtpVo.create(otp);

      const otpDomain: IOtpModel = {
        name: otpData.name,
        email: emailVO.value,
        mobile: otpData.mobile,
        password: passwordVo.value,
        otp: otpVo.value,
        role:otpData.role,
        createdAt: new Date()
      }

      await this.otpRepo.save(otpDomain);
      await this.mailer.sendOTP(otpData.email, otp);
      return otpDomain
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
