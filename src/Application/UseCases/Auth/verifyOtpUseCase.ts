import { inject, injectable } from "tsyringe";
import type { IOtpRepository } from "../../Interfaces/Repositories/Auth/otp.repository";
import { AppError } from "../../../Domain/Utils/customError";
import type { IOtpModel } from "../../../Domain/Entities/Iotp";
import { IVerifyOtpUseCase } from "../../Interfaces/UseCases/Auth/verifyOtp.interface";
import { OTP_MESSAGES } from "../../../Infrastructure/constants/messages/otpMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IOtpService } from "../../Interfaces/Services/otp-service.interface";

@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    @inject("IOtpRepository") private _otpRepo: IOtpRepository,
    @inject("IOtpService") private _otpService: IOtpService,

  ) { }

  async execute(otp: string, email: string): Promise<IOtpModel> {
    const otpData = await this._otpRepo.findOne({ email });
    if (!otpData) throw new AppError(OTP_MESSAGES.SESSION_NOT_FOUND, STATUS.NOT_FOUND);

    const isOtpValid = await this._otpService.compareOtp(otp, otpData.otp)
    if (!isOtpValid) throw new AppError(OTP_MESSAGES.OTP_INVALID, STATUS.BAD_REQUEST);

    await this._otpRepo.delete({ email });
    return otpData;
  }
}
