import { inject, injectable } from "tsyringe";
import { IAddWorkerTempUseCase } from "../../interfaces/useCase_Interfaces/Worker/addWorkerTempUseCase.interface";
import { Request } from "express";
import { IHubWorkersTempRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { HubWorkersTemp } from "../../../Domain/Entities/Worker/WrokersTemp";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ENV } from "../../../Infrastructure/constants/env";
import { AddWorkerTempRequestDTO, AddWorkerTempResponseDTO } from "../../Dto/Hub/hub.dto";
import { WorkerMapper } from "../../Mappers/Workers/WorkerMapper";


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

    async execute(hubId:string,dto:AddWorkerTempRequestDTO): Promise<AddWorkerTempResponseDTO> {

        console.log(dto)

        const existingWorker = await this._hubWorkerRepo.findOne({ email: dto.email });
        if (existingWorker) throw new AppError(WORKER_MESSAGES.EMAIL_ALREADY_EXISTS, STATUS.BAD_REQUEST);

        const existingTempWorker = await this._hubWorkersTempRepo.findOne({ email: dto.email });

        if (existingTempWorker) {
            const response = WorkerMapper.toAddWorkerTempResponse(existingTempWorker)
            if (existingTempWorker.status === "OTP-Verified") return response;
            if (existingTempWorker.status === "BASIC-Info") return response

            await this._hubWorkersTempRepo.delete({ email: dto.email });
        }

        const plainOtp = this._otpService.generateOtp();
        const hashOtp = await this._otpService.hashOtp(plainOtp);

        const tempWorker = WorkerMapper.toTempWorkerEntity(hubId,dto,hashOtp)
           
        console.log("DEV OTP:", plainOtp);
        if(ENV.IS_PROD)await this._mailer.sendOTP(dto.email, plainOtp);

        const saved = await this._hubWorkersTempRepo.save(tempWorker);

        const response = WorkerMapper.toAddWorkerTempResponse(saved)

        return response

    }
}