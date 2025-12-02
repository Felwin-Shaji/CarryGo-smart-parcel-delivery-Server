import { inject, injectable } from "tsyringe";
import type { IOtpRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository.js";
import { AppError } from "../../../Domain/utils/customError.js";
import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";
import { IVerifyOtpUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/verifyOtp.interface.js";
import { OTP_MESSAGES } from "../../../Infrastructure/constants/messages/otpMessage.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface.js";

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
