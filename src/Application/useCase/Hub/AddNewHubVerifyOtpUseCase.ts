import { inject, injectable } from "tsyringe";
import { IHubTempRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { IAddNewHubVerifyOtpUseCase } from "../../interfaces/useCase_Interfaces/Hub/IAddNewHubVerifyOtpUseCase";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AddNewHubVerifyOtpDTO } from "../../Dto/Agency/agency.dto";

@injectable()
export class AddNewHubVerifyOtpUseCase implements IAddNewHubVerifyOtpUseCase {

    constructor(
        @inject("IHubTempRepository") private _hubTempRepo: IHubTempRepository,
        @inject("IOtpService") private _otpService: IOtpService
    ) { }

    async verify(dto: AddNewHubVerifyOtpDTO): Promise<boolean> {

        const tempHub = await this._hubTempRepo.findOne({ _id: dto.tempHubId, email: dto.email });

        if (!tempHub) throw new AppError(HUB_MESSAGES.INVALID_TEMP_SESSION, STATUS.BAD_REQUEST);

        if (tempHub.status === "OTP-Verified") return true;
        if (tempHub.status !== "BASIC-Info") throw new AppError(HUB_MESSAGES.OTP_NOT_SENT_YET, STATUS.BAD_REQUEST);
        
        const match = await this._otpService.compareOtp(dto.otp, tempHub.otp!);
        if (!match) return false;

        await this._hubTempRepo.findOneAndUpdate(
            { _id: dto.tempHubId },
            { status: "OTP-Verified", updateAt: new Date() }
        );
        return true;
    }
}
