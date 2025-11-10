import { container } from "tsyringe";

import type { ISendOtpUseCase } from "../../Application/interfaces/useCase/requestOtp.usecase.js";
import { SendOtpUseCase } from "../../Application/useCase/send-otp.usecase.js";
import type { IVerifyOtpUseCase } from "../../Application/interfaces/useCase/verifyOtp.interface.js";
import { VerifyOtpUseCase } from "../../Application/useCase/verifyOtpUseCase.js";
import type { IGenerateTokenUseCase } from "../../Application/interfaces/useCase/GenerateToken.usecase.js";
import { GenerateTokenUseCase } from "../../Application/useCase/GenerateToken.usecase.js";
import type { IRegisterUserUseCase } from "../../Application/interfaces/useCase/RegisterUser.useCase.js";
import { RegisterUserUseCase } from "../../Application/useCase/RegisterUser.useCase.js";


export class UsecaseRegistery {
    static registerUsecase(): void {
        container.register<ISendOtpUseCase>("ISendOtpUseCase", {
            useClass: SendOtpUseCase
        })

        container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase", {
            useClass: VerifyOtpUseCase
        })

        container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
            useClass: RegisterUserUseCase
        })

        container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
            useClass: GenerateTokenUseCase
        })
    }
}