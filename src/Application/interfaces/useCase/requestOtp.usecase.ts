import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";
import type { SendOtpDTO } from "../../Dto/Auth/Auth.dto.js";

export interface ISendOtpUseCase {
    execute(otp:SendOtpDTO): Promise<IOtpModel>;
}