import { inject, injectable } from "tsyringe";
import { IHubWorkersTempRepository } from "../../Interfaces/Repositories/Worker/IHubWorkersTempRepository";
import { IOtpService } from "../../Interfaces/Services/IOTPService";
import { AppError } from "../../../Domain/Utils/customError";
import { IWorkerVerifyOtpUseCase } from "../../Interfaces/UseCases/Worker/IWorkerVerifyOtpUseCase";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessages";

@injectable()
export class WorkerVerifyOtpUseCase implements IWorkerVerifyOtpUseCase {

    constructor(
        @inject("IHubWorkersTempRepository") private _tempWorkerRepo: IHubWorkersTempRepository,
        @inject("IOtpService") private _otpService: IOtpService
    ) {}

    async verify(email: string, otp: string): Promise<void> {

        const tempWorker = await this._tempWorkerRepo.findOne({ email });
        

        if (!tempWorker) throw new AppError(WORKER_MESSAGES.OTP_SESSION_NOT_FOUND, STATUS.NOT_FOUND);

        if (tempWorker.expiresAt < new Date()) {
            throw new AppError(WORKER_MESSAGES.OTP_EXPIRED, STATUS.BAD_REQUEST);
        }

        const isValid = await this._otpService.compareOtp(otp, tempWorker.otp);

        if (!isValid) throw new AppError(HUB_MESSAGES.OTP_MISMATCH,STATUS.BAD_GATEWAY)

        tempWorker.status = "OTP-Verified"; 

        const updatedData = await this._tempWorkerRepo.findOneAndUpdate({ email }, tempWorker);

        if(!updatedData) throw new AppError(HUB_MESSAGES.OTP_NOT_VERIFIED,STATUS.BAD_GATEWAY);
    }
}
