import { OtpResponseDTO, ResendOtpDTO } from "../../../DTOs/Auth/Auth.dto";


export interface IResendOtpUseCase {
    execute(dto: ResendOtpDTO): Promise<OtpResponseDTO> 
}