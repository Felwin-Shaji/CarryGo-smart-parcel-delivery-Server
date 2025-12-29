import { inject, injectable } from "tsyringe";
import { IAddNewHubResendOtp } from "../../interfaces/useCase_Interfaces/Hub/IAddNewHubResendOtp";
import { IHubTempRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { ENV } from "../../../Infrastructure/constants/env";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";

@injectable()
export class AddNewHubResendOtp implements IAddNewHubResendOtp {

    constructor(
        @inject("IHubTempRepository") private _hubTempRepo: IHubTempRepository,
        @inject("IOtpService") private _otpService: IOtpService,
        @inject("IMailService") private _mailer: IMailService
    ) { }

    async resend(email: string): Promise<{ success: boolean; expiresAt: string }> {

        const tempHub = await this._hubTempRepo.findOne({ email });
        if (!tempHub) throw new AppError(HUB_MESSAGES.OTP_SESSION_NOT_FOUND);

        const newOtp = this._otpService.generateOtp();
        console.log("Resend Hub otp",newOtp)
        const hashedOtp = await this._otpService.hashOtp(newOtp);

        tempHub.otp = hashedOtp;
        tempHub.expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 mins

        await this._hubTempRepo.findOneAndUpdate({ _id: tempHub.id },tempHub);

        if (ENV.IS_PROD) await this._mailer.sendOTP(email, newOtp);

        return {
            success: true,
            expiresAt: tempHub.expiresAt.toISOString(),
        };
    }
}
