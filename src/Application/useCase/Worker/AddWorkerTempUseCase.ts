import { inject, injectable } from "tsyringe";
import { IAddWorkerTempUseCase } from "../../interfaces/useCase_Interfaces/Worker/addWorkerTempUseCase.interface";
import { Request } from "express";
import { IHubWorkersTempRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { HubWorkersTemp } from "../../../Domain/Entities/Worker/WrokersTemp";
import { Role } from "../../../Infrastructure/Types/types";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ENV } from "../../../Infrastructure/constants/env";

interface AddWorkerTempDTO {
    hubId: string
    name: string,
    email: string,
    mobile: string,
    role: Role
}

interface AddWorkersTempResponseDTO {
    currentStatus: string
}


@injectable()
export class AddWorkerTempUseCase implements IAddWorkerTempUseCase {
    constructor(
        @inject("IHubWorkersTempRepository") private _hubWorkersTempRepo: IHubWorkersTempRepository,
        @inject("IHubWorkerRepository") private _hubWorkerRepo: IHubWorkerRepository,
        @inject("IOtpService") private _otpService: IOtpService,
        @inject("IMailService") private _mailer: IMailService
    ) { }

    async execute(req: Request): Promise<HubWorkersTemp> {

        const dto = req.body as AddWorkerTempDTO

        const existingWorker = await this._hubWorkerRepo.findOne({ email: dto.email });
        if (existingWorker) throw new AppError(WORKER_MESSAGES.EMAIL_ALREADY_EXISTS, STATUS.BAD_REQUEST);

        const existingTempWorker = await this._hubWorkersTempRepo.findOne({ email: dto.email });

        if (existingTempWorker) {
            if (existingTempWorker.status === "OTP-Verified") return existingTempWorker;
            if (existingTempWorker.status === "BASIC-Info") throw new AppError(WORKER_MESSAGES.OTP_ALREADY_SENT, STATUS.BAD_REQUEST);

            await this._hubWorkersTempRepo.delete({ email: dto.email });
        }

        const plainOtp = this._otpService.generateOtp();
        const hashOtp = await this._otpService.hashOtp(plainOtp);

        const expiresAt = new Date(Date.now() + 1000 * 60 * 2);


        const tempWorker: HubWorkersTemp = {
            name: dto.name,
            email: dto.email,
            mobile: dto.mobile,
            role: dto.role,
            otp: hashOtp,
            status: "BASIC-Info",
            expiresAt, 
            id: null,
            hubId: dto.hubId
        };

        console.log("DEV OTP:", plainOtp);
        if(ENV.IS_PROD)await this._mailer.sendOTP(dto.email, plainOtp);

        const saved = await this._hubWorkersTempRepo.save(tempWorker);

        return saved

    }
}