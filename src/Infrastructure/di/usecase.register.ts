import { container } from "tsyringe";

import type { ISendOtpUseCase } from "../../Application/interfaces/useCase/requestOtp.usecase.js";
import { SendOtpUseCase } from "../../Application/useCase/send-otp.usecase.js";


export class UsecaseRegistery {
    static registerUsecase():void{
        container.register<ISendOtpUseCase>("ISendOtpUseCase",{
            useClass:SendOtpUseCase
        })
    }
}