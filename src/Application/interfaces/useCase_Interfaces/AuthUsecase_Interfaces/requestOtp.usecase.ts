import { OtpResponseDTO, SendOtpDTO } from "../../../Dto/Auth/Auth.dto";

export interface ISendOtpUseCase {
    execute(otp:SendOtpDTO): Promise<OtpResponseDTO>;
}