import { container } from "tsyringe";

import type { ISendOtpUseCase } from "../../Application/interfaces/useCase/requestOtp.usecase.js";
import { SendOtpUseCase } from "../../Application/useCase/send-otp.usecase.js";
import type { IVerifyOtpUseCase } from "../../Application/interfaces/useCase/verifyOtp.interface.js";
import { VerifyOtpUseCase } from "../../Application/useCase/verifyOtpUseCase.js";
import type { IGenerateTokenUseCase } from "../../Application/interfaces/useCase/GenerateToken.usecase.js";
import { GenerateTokenUseCase } from "../../Application/useCase/GenerateToken.usecase.js";
// import type { IRegisterUserUseCase } from "../../Application/interfaces/useCase/RegisterUser.useCase.js";
import { RegisterUserUseCase } from "../../Application/useCase/User/RegisterUser.useCase.js";
import type { IRefreshTokenUseCase } from "../../Application/interfaces/useCase/refreshToken.usecase.js";
import { RefreshTokenUseCase } from "../../Application/useCase/refreshToken.usecase.js";
import type { ILoginUsecase } from "../../Application/interfaces/useCase/login.usecase.js";
import { LoginUsecase } from "../../Application/useCase/login.usecase.js";
import type { ILogoutUsecase } from "../../Application/interfaces/useCase/logout.usecase.js";
import { LogoutUsecase } from "../../Application/useCase/logout.usecase.js";
import type { IRegisterUserUseCase } from "../../Application/interfaces/useCase/user/RegisterUser.useCase.js";
import type { IRegisterAgencyUseCase } from "../../Application/interfaces/useCase/Agency/Agencyregisrtation.usecase.js";
import { RegisterAgencyUseCase } from "../../Application/useCase/Agency/RegisterAgency.usecase.js";


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

        container.register<IRegisterAgencyUseCase>("IRegisterAgencyUseCase",{
            useClass:RegisterAgencyUseCase
        })

        container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
            useClass: GenerateTokenUseCase
        })

        container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase",{
            useClass:RefreshTokenUseCase
        })

        container.register<ILoginUsecase>("ILoginUsecase",{
            useClass:LoginUsecase
        })

        container.register<ILogoutUsecase>("ILogoutUsecase",{
            useClass:LogoutUsecase
        })
    }
}