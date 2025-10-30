import type { SendOtpDto } from "../../Dto/Auth.js";

export interface ISendOtpUseCase {
    execute(otpData:SendOtpDto): Promise<void>;
}