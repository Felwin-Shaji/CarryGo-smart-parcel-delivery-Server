import { IHubWorkersTempRepository } from "../../Interfaces/Repositories/Worker/worersTemp.repository";
import { IMailService } from "../../Interfaces/Services/email-service.interface";
import { IOtpService } from "../../Interfaces/Services/otp-service.interface";
import { IWorkerResendOtpUseCase } from "../../Interfaces/UseCases/Worker/IWorkerResendOtpUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { inject, injectable } from "tsyringe";

@injectable()
export class WorkerResendOtpUseCase implements IWorkerResendOtpUseCase {
    constructor(
        @inject("IHubWorkersTempRepository") private _tempWorkerRepo: IHubWorkersTempRepository,
        @inject("IOtpService") private _otpService: IOtpService,
        @inject("IMailService") private _mailer: IMailService

    ) { };

    async resendOtp(email: string): Promise<Date> {

        const tempWorker = await this._tempWorkerRepo.findOne({ email });

        if (!tempWorker) {
            throw new AppError(
                WORKER_MESSAGES.OTP_SESSION_NOT_FOUND,
                STATUS.NOT_FOUND
            );
        }

        const otp = this._otpService.generateOtp();
        console.log("DEV OTP:", otp);

        const hashedOtp = await this._otpService.hashOtp(otp);

        tempWorker.otp = hashedOtp;
        tempWorker.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await this._tempWorkerRepo.findOneAndUpdate(
            { email },
            tempWorker
        );

        await this._mailer.sendOTP(email, otp);

        return tempWorker.expiresAt
    }
}
