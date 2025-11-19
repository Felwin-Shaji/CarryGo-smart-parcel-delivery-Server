import { IOtpModel } from "../../../../Domain/Entities/Iotp";
import { ResendOtpDTO } from "../../../Dto/Auth/Auth.dto";


export interface IResendOtpUseCase {
    execute(dto: ResendOtpDTO): Promise<IOtpModel> 
}