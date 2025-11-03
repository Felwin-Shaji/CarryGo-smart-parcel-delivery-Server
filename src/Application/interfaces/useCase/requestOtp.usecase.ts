import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";
import type { UserDTO } from "../../Dto/Auth.js";

export interface ISendOtpUseCase {
    execute(otpData:UserDTO): Promise<IOtpModel>;
}