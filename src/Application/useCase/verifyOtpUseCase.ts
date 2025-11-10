import { inject, injectable } from "tsyringe";
import type { IVerifyOtpUseCase } from "../interfaces/useCase/verifyOtp.interface.js";
import type { IOtpRepository } from "../interfaces/repositories/auth/otp.repository.js";
import { AppError } from "../../Domain/utils/customError.js";
import { OtpVo } from "../../Domain/ValueObjects/otp.valueObject.js";
import type { IOtpModel } from "../../Domain/Entities/Iotp.js";

@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    @inject("IOtpRepository") private otpRepo: IOtpRepository
  ) {}

async execute(otp: string, email: string): Promise<IOtpModel> {
  const otpData = await this.otpRepo.findOne({ email });
  if (!otpData) throw new AppError("OTP not found or expired.");

  const savedOtp = new OtpVo(otpData.otp);
  const isOtpValid = await savedOtp.compare(otp);
  if (!isOtpValid) throw new AppError("Invalid OTP.");

  await this.otpRepo.delete({ email });
  return otpData; 
}
}
