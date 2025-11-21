import { IOtpModel } from "../../../../Domain/Entities/Iotp";


export interface IVerifyOtpUseCase{
    execute(otp:string,email:string):Promise<IOtpModel>
}