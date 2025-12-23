import { inject, injectable } from "tsyringe";
import { IHubWorkersTempRepository } from "../../../Infrastructure/Interface/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { IWorkerVerifyOtpUseCase } from "../../interfaces/useCase_Interfaces/Worker/addWorkerVerifyOtpUseCase";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";

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
