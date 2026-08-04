import { OtpResponseDTO, SendOtpDTO } from "../../../DTOs/Auth/Auth.dto";

export interface ISendOtpUseCase {
    execute(otp:SendOtpDTO): Promise<OtpResponseDTO>;
}