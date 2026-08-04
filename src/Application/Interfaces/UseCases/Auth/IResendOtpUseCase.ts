import { OtpResponseDTO, ResendOtpDTO } from "../../../DTOs/Auth/AuthDTO";


export interface IResendOtpUseCase {
    execute(dto: ResendOtpDTO): Promise<OtpResponseDTO> 
}