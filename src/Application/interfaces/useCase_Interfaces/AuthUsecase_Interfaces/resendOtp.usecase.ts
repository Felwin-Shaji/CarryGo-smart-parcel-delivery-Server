import { OtpResponseDTO, ResendOtpDTO } from "../../../Dto/Auth/Auth.dto";


export interface IResendOtpUseCase {
    execute(dto: ResendOtpDTO): Promise<OtpResponseDTO> 
}