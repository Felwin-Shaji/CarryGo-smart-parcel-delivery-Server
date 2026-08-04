import { OtpResponseDTO, SendOtpDTO } from "../../../DTOs/Auth/AuthDTO";

export interface ISendOtpUseCase {
    execute(otp:SendOtpDTO): Promise<OtpResponseDTO>;
}