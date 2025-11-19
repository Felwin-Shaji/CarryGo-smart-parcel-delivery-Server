import { IOtpModel } from "../../../../Domain/Entities/Iotp";
import { SendOtpDTO } from "../../../Dto/Auth/Auth.dto";

export interface ISendOtpUseCase {
    execute(otp:SendOtpDTO): Promise<IOtpModel>;
}