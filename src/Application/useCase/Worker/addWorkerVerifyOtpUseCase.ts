import { inject, injectable } from "tsyringe";
import { IHubWorkersTempRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { IWorkerVerifyOtpUseCase } from "../../interfaces/useCase_Interfaces/Worker/addWorkerVerifyOtpUseCase";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class WorkerVerifyOtpUseCase implements IWorkerVerifyOtpUseCase {

    constructor(
        @inject("IHubWorkersTempRepository") private _tempWorkerRepo: IHubWorkersTempRepository,
        @inject("IOtpService") private _otpService: IOtpService
    ) {}

    async verify(email: string, tempWorkerId: string, otp: string): Promise<boolean> {

        const tempWorker = await this._tempWorkerRepo.findOne({ email });

        if (!tempWorker) throw new AppError(WORKER_MESSAGES.OTP_SESSION_NOT_FOUND, STATUS.NOT_FOUND);
        if (tempWorker._id !== tempWorkerId) throw new AppError(WORKER_MESSAGES.OTP_SESSION_NOT_FOUND, STATUS.NOT_FOUND);

        if (tempWorker.expiresAt < new Date()) {
            throw new AppError(WORKER_MESSAGES.OTP_EXPIRED, STATUS.BAD_REQUEST);
        }

        const isValid = await this._otpService.compareOtp(otp, tempWorker.otp);

        if (!isValid) return false;

        tempWorker.status = "OTP-Verified";

        await this._tempWorkerRepo.findOneAndUpdate({ _id: tempWorker._id }, tempWorker);

        return true;
    }
}
