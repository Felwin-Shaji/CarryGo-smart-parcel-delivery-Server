import { IOtpModel } from "../../../../Domain/Entities/IOtpModel.js";


export interface IVerifyOtpUseCase{
    execute(otp:string,email:string):Promise<IOtpModel>
}