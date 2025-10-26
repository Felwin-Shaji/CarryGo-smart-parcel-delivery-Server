import { EmailVo } from "../../Domain/ValueObjects/Email.valueObject.js";
import { PasswordVo } from "../../Domain/ValueObjects/password.valueObject.js";
import type { Otp } from "../Dto/otp.dto.js";
import type { IOtpRepository } from "../interfaces/repositories/auth/otp.repository.js";
import type { IUserRepository } from "../interfaces/repositories/user/user.repository.js";
import type { IMailService } from "../interfaces/services/email.service.js";
import type { ISendOtpUseCase } from "../interfaces/useCase/requestOtp.usecase.js";
import logger from "../../Infrastructure/logger/logger.js";
import { OtpVo } from "../../Domain/ValueObjects/otp.valueObject.js";

export class SendOtpUseCase<T, U> implements ISendOtpUseCase {
  constructor(private otpRepo: IOtpRepository<T>, private userRepo: IUserRepository<U>, private mailer: IMailService) { };

  async execute(name: string, email: string, mobile: string, password: string): Promise<void> {

    try {
      const emailVO = EmailVo.create(email);
      const passwordVo = await PasswordVo.create(password);

      const existingUser = await this.userRepo.findOne({ email: emailVO.value });
      if (existingUser) throw new Error("User already registered");

      const existingOtp = await this.otpRepo.findOne({ email: emailVO.value });
      if (existingOtp) throw new Error("Please wait until the current OTP expires before requesting a new one.");

      const otp = this.otpRepo.generateOtp();
      const otpVo = await OtpVo.create(otp);

      const otpDomain: Otp = {
        name,
        email: emailVO.value,
        mobile,
        password: passwordVo.value,
        otp: otpVo.value,
        createdAt: new Date()
      }

      await this.otpRepo.save(otpDomain as T);
      await this.mailer.sendOTP(email, otp);

    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
