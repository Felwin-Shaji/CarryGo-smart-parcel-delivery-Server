import { inject, injectable } from "tsyringe";
import { HubTemp } from "../../../Domain/Entities/Hub/HubTemp";
import { AddNewHubBaseDto } from "../../Dto/Agency/agency.dto";
import { IAddHubTempUseCase } from "../../interfaces/useCase_Interfaces/Hub/IAddHubTempUseCase";
import { IHubTempRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { AppError } from "../../../Domain/utils/customError";
import { HubTempMapper } from "../../Mappers/HubMapper";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import dotenv from "dotenv";
import { ENV } from "../../../Infrastructure/constants/env";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
dotenv.config()



@injectable()
export class AddHubTempUseCase implements IAddHubTempUseCase {

    constructor(
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IHubTempRepository") private _hubTempRepo: IHubTempRepository,
        @inject("IOtpService") private _otpService: IOtpService,
        @inject("IMailService") private _mailer: IMailService
    ) { }

    async execute(dto: AddNewHubBaseDto): Promise<HubTemp> {

        const existingHub = await this._hubRepo.findOne({ email: dto.email });
        if (existingHub) throw new AppError(HUB_MESSAGES.EMAIL_ALREADY_EXISTS, STATUS.BAD_REQUEST);

        const hubSameName = await this._hubRepo.findOne({ name: dto.name, agencyId: dto.agencyId });
        if (hubSameName) throw new AppError(HUB_MESSAGES.NAME_ALREADY_EXISTS, STATUS.BAD_REQUEST);


        const existingTempHub = await this._hubTempRepo.findOne({ email: dto.email });

        if (existingTempHub) {
            if (existingTempHub.status === "OTP-Verified") return existingTempHub;
            if (existingTempHub.status === "BASIC-Info") throw new AppError(HUB_MESSAGES.OTP_ALREADY_SENT, STATUS.BAD_REQUEST);
            await this._hubTempRepo.delete({ email: dto.email });
        }

        const plainOtp = this._otpService.generateOtp();
        const hashOtp = await this._otpService.hashOtp(plainOtp);

        const tempHubEntity = HubTempMapper.toHubTemp(dto, hashOtp);
        const saved = await this._hubTempRepo.save(tempHubEntity);


        console.log("DEV OTP:", plainOtp);

        if (ENV.IS_PROD) await this._mailer.sendOTP(dto.email, plainOtp);

        return saved;
    }
}
