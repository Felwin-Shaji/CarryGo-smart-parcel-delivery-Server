import { inject, injectable } from "tsyringe";
import type { IOtpRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository.js";
import { AppError } from "../../../Domain/utils/customError.js";
import { OtpVo } from "../../../Domain/ValueObjects/otp.valueObject.js";
import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";
import { IVerifyOtpUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/verifyOtp.interface.js";

@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    @inject("IOtpRepository") private _otpRepo: IOtpRepository
  ) {}

async execute(otp: string, email: string): Promise<IOtpModel> {
  const otpData = await this._otpRepo.findOne({ email });
  if (!otpData) throw new AppError("OTP not found or expired.");

  const savedOtp = new OtpVo(otpData.otp);
  const isOtpValid = await savedOtp.compare(otp);
  if (!isOtpValid) throw new AppError("Invalid OTP.");

  await this._otpRepo.delete({ email });
  return otpData; 
}
}
