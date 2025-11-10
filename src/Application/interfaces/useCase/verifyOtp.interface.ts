import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";

export interface IVerifyOtpUseCase{
    execute(otp:string,email:string):Promise<IOtpModel>
}