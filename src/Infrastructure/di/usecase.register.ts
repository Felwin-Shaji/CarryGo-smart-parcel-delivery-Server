import { container } from "tsyringe";

// import type { ISendOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/requestOtp.usecase.js";
import { SendOtpUseCase } from "../../Application/useCase/Auth/send-otp.usecase.js";
// import type { IVerifyOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/verifyOtp.interface.js";
import { VerifyOtpUseCase } from "../../Application/useCase/Auth/verifyOtpUseCase.js";
// import type { IGenerateTokenUseCase } from "../../Application/interfaces/useCase_Interfaces/GenerateToken.usecase.js";
import { GenerateTokenUseCase } from "../../Application/useCase/Auth/GenerateToken.usecase.js";
import { RegisterUserUseCase } from "../../Application/useCase/User/RegisterUser.useCase.js";
// import type { IRefreshTokenUseCase } from "../../Application/interfaces/useCase_Interfaces/refreshToken.usecase.js";
import { RefreshTokenUseCase } from "../../Application/useCase/Auth/refreshToken.usecase.js";
// import type { ILoginUsecase } from "../../Application/interfaces/useCase_Interfaces/login.usecase.js";
import { LoginUsecase } from "../../Application/useCase/Auth/login.usecase.js";
import type { ILogoutUsecase } from "../../Application/interfaces/useCase_Interfaces/Auth/logout.usecase.js";
// import { LogoutUsecase } from "../../Application/useCase/logout.usecase.js";
import type { IRegisterUserUseCase } from "../../Application/interfaces/useCase_Interfaces/user/RegisterUser.useCase.js";
import type { IRegisterAgencyUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/Agencyregisrtation.usecase.js";
import { RegisterAgencyUseCase } from "../../Application/useCase/Agency/RegisterAgency.usecase.js";
import { IUploadAgencyKycFilesUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/UploadAgencyKycFilesUseCase.js";
import { UploadAgencyKycFilesUseCase } from "../../Application/useCase/Agency/UploadAgencyKycFiles.usecase.js";
import { ISaveAgencyKycUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/SaveAgencyKycUseCase.js";
import { SaveAgencyKycUseCase } from "../../Application/useCase/Agency/SaveAgencyKyc.usecase.js";
import { IUpdateAgencyKycStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase.js";
// import { UpdateAgencyKycStatusUseCase } from "../../Application/useCase/Agency/UpdateAgencyKycStatus.usecase.js";
import { IGetAgenciesUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/GetAgenciesUseCase.js";
import { GetAgenciesUseCase } from "../../Application/useCase/Agency/GetAgencies.usecase.js";
import { IGetUsersUseCase } from "../../Application/interfaces/useCase_Interfaces/user/GetUsers.usecase.js";
import { GetUsersUseCase } from "../../Application/useCase/User/GetUsers.usecase.js";
import { IGetAgencyWithKYCUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase.js";
import { GetAgencyWithKYCUseCase } from "../../Application/useCase/Agency/GetAgencyWithKYC.usecase.js";
import { ResendOtpUseCase } from "../../Application/useCase/Auth/resendotp.usecase.js";
import { IResendOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/Auth/resendOtp.usecase.js";
import { ISendOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/Auth/requestOtp.usecase.js";
import { IVerifyOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/Auth/verifyOtp.interface.js";
import { IGenerateTokenUseCase } from "../../Application/interfaces/useCase_Interfaces/Auth/GenerateToken.usecase.js";
import { IRefreshTokenUseCase } from "../../Application/interfaces/useCase_Interfaces/Auth/refreshToken.usecase.js";
import { ILoginUsecase } from "../../Application/interfaces/useCase_Interfaces/Auth/login.usecase.js";
import { LogoutUsecase } from "../../Application/useCase/Auth/logout.usecase.js";
import { UpdateAgencyKycStatusUseCase } from "../../Application/useCase/Agency/UpdateAgencyKyc.usecase.js";



export class UsecaseRegistery {
    static registerUsecase(): void {
        container.register<ISendOtpUseCase>("ISendOtpUseCase", {
            useClass: SendOtpUseCase
        })

        container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase", {
            useClass: VerifyOtpUseCase
        })

        container.register<IResendOtpUseCase>("IResendOtpUseCase",{
            useClass:ResendOtpUseCase
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

        container.register<IUploadAgencyKycFilesUseCase>("IUploadAgencyKycFilesUseCase",{
            useClass:UploadAgencyKycFilesUseCase
        })

        container.register<ISaveAgencyKycUseCase>("ISaveAgencyKycUseCase",{
            useClass:SaveAgencyKycUseCase
        })

        container.register<IUpdateAgencyKycStatusUseCase>("IUpdateAgencyKycStatusUseCase",{
            useClass:UpdateAgencyKycStatusUseCase
        })

        container.register<IGetAgenciesUseCase>("IGetAgenciesUseCase",{
            useClass:GetAgenciesUseCase
        })

        container.register<IGetUsersUseCase>("IGetUsersUseCase",{
            useClass:GetUsersUseCase
        })

        container.register<IGetAgencyWithKYCUseCase>("IGetAgencyWithKYCUseCase",{
            useClass:GetAgencyWithKYCUseCase
        })
    }
}