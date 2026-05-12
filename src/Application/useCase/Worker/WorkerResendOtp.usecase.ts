import { IHubWorkersTempRepository } from "@/Application/interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { IMailService } from "@/Application/interfaces/services_Interfaces/email-service.interface";
import { IOtpService } from "@/Application/interfaces/services_Interfaces/otp-service.interface";
import { IWorkerResendOtpUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IWorkerResendOtpUseCase";
import { AppError } from "@/Domain/utils/customError";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
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
