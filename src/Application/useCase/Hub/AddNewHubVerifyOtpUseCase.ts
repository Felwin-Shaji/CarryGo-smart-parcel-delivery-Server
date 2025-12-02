import { inject, injectable } from "tsyringe";
import { IHubTempRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository";
import { IOtpService } from "../../interfaces/services_Interfaces/otp-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { IAddNewHubVerifyOtpUseCase } from "../../interfaces/useCase_Interfaces/Hub/IAddNewHubVerifyOtpUseCase";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class AddNewHubVerifyOtpUseCase implements IAddNewHubVerifyOtpUseCase {

    constructor(
        @inject("IHubTempRepository") private _hubTempRepo: IHubTempRepository,
        @inject("IOtpService") private _otpService: IOtpService
    ) { }

    async verify(email: string, tempHubId: string, otp: string): Promise<boolean> {

        const tempHub = await this._hubTempRepo.findOne({ _id: tempHubId, email });

        if (!tempHub) throw new AppError(HUB_MESSAGES.INVALID_TEMP_SESSION, STATUS.BAD_REQUEST);

        if (tempHub.status === "OTP-Verified") return true;

        const match = await this._otpService.compareOtp(otp, tempHub.otp!);
        if (!match) return false;

        await this._hubTempRepo.findOneAndUpdate(
            { _id: tempHubId },
            { status: "OTP-Verified", updateAt: new Date() }
        );
        return true;
    }
}
