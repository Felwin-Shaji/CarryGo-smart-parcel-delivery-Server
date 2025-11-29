import { inject, injectable } from "tsyringe";
import { IHubWorkersTempRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { IWorkerVerifyOtpUseCase } from "../../interfaces/useCase_Interfaces/Worker/addWorkerVerifyOtpUseCase";

@injectable()
export class WorkerVerifyOtpUseCase implements IWorkerVerifyOtpUseCase {

    constructor(
        @inject("IHubWorkersTempRepository") private _tempWorkerRepo: IHubWorkersTempRepository,
        @inject("IOtpService") private _otpService: IOtpService
    ) {}

    async verify(email: string, tempWorkerId: string, otp: string): Promise<boolean> {

        const tempWorker = await this._tempWorkerRepo.findOne({ email });

        if (!tempWorker) throw new AppError("No OTP process found for this email");
        if (tempWorker._id !== tempWorkerId) throw new AppError("Invalid temporary worker ID");

        if (tempWorker.expiresAt < new Date()) {
            throw new AppError("OTP expired. Please request a new one.");
        }

        const isValid = await this._otpService.compareOtp(otp, tempWorker.otp);

        if (!isValid) return false;

        // Mark as verified
        tempWorker.status = "OTP-Verified";

        await this._tempWorkerRepo.findOneAndUpdate({ _id: tempWorker._id }, tempWorker);

        return true;
    }
}
