import { inject, injectable } from "tsyringe";
import { HubTemp } from "../../../Domain/Entities/Hub/HubTemp";
import { AddNewHubBaseDto } from "../../DTOs/Agency/AgencyDTO";
import { IAddHubTempUseCase } from "../../Interfaces/UseCases/Hub/IAddHubTempUseCase";
import { IHubTempRepository } from "../../Interfaces/Repositories/Hub/IHubTempRepository";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { AppError } from "../../../Domain/Utils/customError";
import { HubTempMapper } from "../../Mappers/Hub/HubMapper";
import { IOtpService } from "../../Interfaces/Services/IOTPService";
import { IMailService } from "../../Interfaces/Services/IEmailService";
import { ENV } from "../../../Infrastructure/Constants/env";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";



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
