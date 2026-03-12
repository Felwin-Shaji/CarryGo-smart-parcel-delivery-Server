import { container } from "tsyringe";
import { SendOtpUseCase } from "../../Application/useCase/Auth/send-otp.usecase";
import { VerifyOtpUseCase } from "../../Application/useCase/Auth/verifyOtpUseCase";
import { GenerateTokenUseCase } from "../../Application/useCase/Auth/GenerateToken.usecase";
import { RegisterUserUseCase } from "../../Application/useCase/User/RegisterUser.useCase";
import { RefreshTokenUseCase } from "../../Application/useCase/Auth/refreshToken.usecase";
import { LoginUsecase } from "../../Application/useCase/Auth/login.usecase";
import type { ILogoutUsecase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/logout.usecase";
import type { IRegisterUserUseCase } from "../../Application/interfaces/useCase_Interfaces/user/RegisterUser.useCase";
import type { IRegisterAgencyUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/Agencyregisrtation.usecase";
import { RegisterAgencyUseCase } from "../../Application/useCase/Agency/RegisterAgency.usecase";
import { IUploadAgencyKycFilesUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/UploadAgencyKycFilesUseCase";
import { UploadAgencyKycFilesUseCase } from "../../Application/useCase/Agency/UploadAgencyKycFiles.usecase";
import { ISaveAgencyKycUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/SaveAgencyKycUseCase";
import { SaveAgencyKycUseCase } from "../../Application/useCase/Agency/SaveAgencyKyc.usecase";
import { IUpdateAgencyKycStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";
import { IGetAgenciesUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/GetAgenciesUseCase";
import { GetAgenciesUseCase } from "../../Application/useCase/Agency/GetAgencies.usecase";
import { IGetUsersUseCase } from "../../Application/interfaces/useCase_Interfaces/user/GetUsers.usecase";
import { GetUsersUseCase } from "../../Application/useCase/User/GetUsers.usecase";
import { IGetAgencyWithKYCUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase";
import { GetAgencyWithKYCUseCase } from "../../Application/useCase/Agency/GetAgencyWithKYC.usecase";
import { ResendOtpUseCase } from "../../Application/useCase/Auth/resendotp.usecase";
import { IResendOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resendOtp.usecase";
import { ISendOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/requestOtp.usecase";
import { IVerifyOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/verifyOtp.interface";
import { IGenerateTokenUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/GenerateToken.usecase";
import { IRefreshTokenUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/refreshToken.usecase";
import { ILoginUsecase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/login.usecase";
import { LogoutUsecase } from "../../Application/useCase/Auth/logout.usecase";
import { UpdateAgencyKycStatusUseCase } from "../../Application/useCase/Agency/UpdateAgencyKyc.usecase";
import { IAddHubUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IAddHubUseCase";
import { AddHubUseCase } from "../../Application/useCase/Hub/AddHubUseCase";
import { IUploadAddFilesUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IUploadAddFilesUseCase";
import { UploadAddFilesUseCase } from "../../Application/useCase/Hub/UploadAddFilesUseCase";
import { IAddHubTempUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IAddHubTempUseCase";
import { AddHubTempUseCase } from "../../Application/useCase/Hub/AddNewHubBasicInfo";
import { IAddNewHubResendOtp } from "../../Application/interfaces/useCase_Interfaces/Hub/IAddNewHubResendOtp";
import { AddNewHubResendOtp } from "../../Application/useCase/Hub/AddNewHubReesendOtp";
import { IAddNewHubVerifyOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IAddNewHubVerifyOtpUseCase";
import { AddNewHubVerifyOtpUseCase } from "../../Application/useCase/Hub/AddNewHubVerifyOtpUseCase";
import { ICheckTempHubStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/ICheckTempHubStatusUseCase";
import { CheckTempHubStatusUseCase } from "../../Application/useCase/Hub/CheckTempHubStatusUseCase";
import { IVarifyEmailUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/varifyEmail.usecase";
import { VarifyEmailUseCase } from "../../Application/useCase/Auth/varifyEmail.usecase";
import { IResetPasswordUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resetPassword.usecase";
import { ResetPasswordUseCase } from "../../Application/useCase/Auth/ResetPasswordUseCase";
import { IUpdateUserStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/user/UpdateUserStatus.usecase";
import { UpdateUserStatusUseCase } from "../../Application/useCase/User/UpdateUserStatus.usecase";
import { IUpdateAgencyStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyStatusUseCase";
import { UpdateAgencyStatusUseCase } from "../../Application/useCase/Agency/UpdateAgencyStatus.usecase";
import { IAddWorkerTempUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/addWorkerTempUseCase.interface";
import { AddWorkerTempUseCase } from "../../Application/useCase/Worker/AddWorkerTempUseCase";
import { IWorkerVerifyOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/addWorkerVerifyOtpUseCase";
import { WorkerVerifyOtpUseCase } from "../../Application/useCase/Worker/addWorkerVerifyOtpUseCase";
import { IRsubmitAgencyKycUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/ResubmitAgencyKycUseCase";
import { RsubmitAgencyKycUseCase } from "../../Application/useCase/Agency/ResubmitAgencyKyc.usecase";
import { IUploadWorkerKycFilesUsecase } from "../../Application/interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { UploadWorkerKycFilesUsecase } from "../../Application/useCase/Worker/UploadWorkerKycFiles.usecase";
import { IAddWorkerUsecase } from "../../Application/interfaces/useCase_Interfaces/Worker/AddWorkerUsecase";
import { AddWorkerUsecase } from "../../Application/useCase/Worker/AddWorkerUsecase";
import { IGetHubsUsecase } from "../../Application/interfaces/useCase_Interfaces/Hub/IGetHubsUsecase";
import { GetHubsUsecase } from "../../Application/useCase/Hub/GetHubsUseCase";
import { IGetUserProfileUseCase } from "../../Application/interfaces/useCase_Interfaces/user/GetUserProfile.useCase";
import { GetUserProfileUseCase } from "../../Application/useCase/User/GetUserProfile.usecase";
import { IEditUserProfileUseCase } from "../../Application/interfaces/useCase_Interfaces/user/EditUserProfile.usecase";
import { EditUserProfileUseCase } from "../../Application/useCase/User/EditUserProfile.usecase";
import { IUserReserUserPassword } from "../../Application/interfaces/useCase_Interfaces/user/ReserUserPassword.usecase";
import { UserReserUserPassword } from "../../Application/useCase/User/ReserUserPassword.usecase";
import { IGetAgencyOverviewUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/GetAgencyOverview.usecase";
import { GetAgencyOverviewUseCase } from "../../Application/useCase/Agency/GetAgencyOverview.usecase";
import { IGetPricingUseCase } from "../../Application/interfaces/useCase_Interfaces/Princing/getPricing.usecase";
import { GetPricingUseCase } from "../../Application/useCase/Pricing/GetPricingPolicy.usecase";
import { GetAgencyPricingUsecase } from "../../Application/useCase/Pricing/GetAgencyPricing.usecase";
import { IGetAgencyPricingUsecase } from "../../Application/interfaces/useCase_Interfaces/Princing/IGetAgencyPricingUsecase";
import { IUpsertAgencyPricingUseCase } from "../../Application/interfaces/useCase_Interfaces/Princing/IUpsertAgencyPricingUseCase";
import { UpsertAgencyPricingUseCase } from "../../Application/useCase/Pricing/UpsertAgencyPricing.usecase";
import { CreateAdminPricingPolicyUseCase } from "../../Application/useCase/Pricing/CreateAdminPricingPolicy.usecase";
import { ICreateAdminPricingPolicyUseCase } from "../../Application/interfaces/useCase_Interfaces/Princing/ICreateAdminPricingPolicyUseCase";
import { IGetAdminProfileUseCase } from "../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminProfileUseCase";
import { GetAdminProfileUseCase } from "../../Application/useCase/Admin/getAdminProfile.usecase";
import { EditAdminProfileUseCase } from "../../Application/useCase/Admin/editAdminProfile.usecase";
import { IEditAdminProfileUseCase } from "../../Application/interfaces/useCase_Interfaces/Admin/IEditAdminProfileUseCase";
import { ResetAdminPasswordUseCase } from "../../Application/useCase/Admin/resetAdminPassword.usecase";
import { IResetAdminPasswordUsecase } from "../../Application/interfaces/useCase_Interfaces/Admin/IResetAdminPasswordUscase";
import { GetAgencyProfileUseCase } from "../../Application/useCase/Agency/getAgencyProfile.usecase";
import { IGetAgencyProfileUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/IGetAgencyProfileUseCase";
import { EditAgencyProfileUseCase } from "../../Application/useCase/Agency/editAgencyProfile.usecase";
import { IEditAgencyProfileUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/IEditAgencyProfileUseCase";
import { ResetAgencyPasswordUseCase } from "../../Application/useCase/Agency/resetAgencyPassword.usecase";
import { IResetAgencyPasswordUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/IResetAgencyPasswordUseCase";
import { ICreateAddressFromLocationUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Address/ICreateAddressFromLocationUseCase";
import { CreateAddressFromLocationUseCase } from "../../Application/useCase/User/Address/CreateAddressFromLocation.usecase";
import { AddUserAddressUseCase } from "../../Application/useCase/User/Address/addUserAddress.usecase";
import { IAddUserAddressUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Address/IAddUserAddressUseCase";
import { IGetUserAddressesUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Address/IGetUserAddressesUseCase";
import { GetUserAddressesUseCase } from "../../Application/useCase/User/Address/getUserAddresses.usecase";
import { IDeleteUserAddressUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Address/IDeleteUserAddressUseCase";
import { DeleteUserAddressUseCase } from "../../Application/useCase/User/Address/deleteUserAddressu.secase";
import { ISetDefaultUserAddressUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Address/ISetDefaultUserAddressUseCase";
import { SetDefaultUserAddressUseCase } from "../../Application/useCase/User/Address/setDefaultUserAddress.usecase";
import { IFindServicableAgencyUsecase } from "../../Application/interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";
import { FindServicableAgencyUsecase } from "../../Application/useCase/User/Booking/findServicableAgency.usecase";
import { IGetWorkersUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkersUseCase";
import { GetWorkersUseCase } from "../../Application/useCase/Worker/GetWorkers.usecase";
import { IGetHubUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IGetHubUseCase";
import { GetHubUseCase } from "../../Application/useCase/Hub/GetHub.usecase";
import { IGetHubOverviewUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IGetHubOverviewUseCase";
import { GetHubOverviewUseCase } from "../../Application/useCase/Hub/GetHubOverview.usecase";
import { IUpdateHubKycStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IUpdateHubKycStatusUseCase";
import { UpdateHubKycStatusUseCase } from "../../Application/useCase/Hub/UpdateHubKycStatus.usecase";
import { ICalculateBookingPriceUsecase } from "../../Application/interfaces/useCase_Interfaces/user/Booking/ICalculateBookingPriceUsecase";
import { ICreateBookingUsecase } from "../../Application/interfaces/useCase_Interfaces/user/Booking/ICreateBookingUsecase";
import { CreateBookingUsecase } from "../../Application/useCase/User/Booking/CreateBooking.usecase";
import { ICreatePaymentOrderUsecase } from "../../Application/interfaces/useCase_Interfaces/Payment/ICreatePaymentOrderUsecase";
import { CreatePaymentOrderUsecase } from "../../Application/useCase/Payment/CreatePaymentOrder.usecase";
import { IValidateSessionUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/IValidateSessionUseCase";
import { ValidateSessionUseCase } from "../../Application/useCase/Auth/ValidateSession.usecase";
import { IGetWalletOverviewUseCase } from "../../Application/interfaces/useCase_Interfaces/Wallet/IGetWalletOverviewUseCase";
import { GetWalletOverviewUseCase } from "../../Application/useCase/Wallet/GetWalletOverview.usecase";
import { IGetWalletUseCase } from "../../Application/interfaces/useCase_Interfaces/Wallet/IGetWalletUseCase";
import { GetWalletUseCase } from "../../Application/useCase/Wallet/GetWallet.usecase";
import { IWalletTopupSuccessUseCase } from "../../Application/interfaces/useCase_Interfaces/Wallet/IWalletTopupSuccessUseCase";
import { WalletTopupSuccessUseCase } from "../../Application/useCase/Wallet/WalletTopupSuccess.usecase";
import { ICreateWalletTopupOrderUseCase } from "../../Application/interfaces/useCase_Interfaces/Wallet/ICreateWalletTopupOrderUseCase";
import { CreateWalletTopupOrderUseCase } from "../../Application/useCase/Wallet/CreateWalletTopupOrder.usecase";
import { IGetBookingUsecase } from "../../Application/interfaces/useCase_Interfaces/user/Booking/IGetBookingUsecase";
import { GetBookingUsecase } from "../../Application/useCase/User/Booking/GetBooking.usecase";
import { IBookingPaymentSuccessUseCase } from "../../Application/interfaces/useCase_Interfaces/Payment/IBookingPaymentSuccessUseCase";
import { BookingPaymentSuccessUseCase } from "../../Application/useCase/Payment/BookingPaymentSuccess.usecase";
import { IUserBookingsUsecase } from "../../Application/interfaces/useCase_Interfaces/user/Booking/IUserBookingsUsecase";
import { UserBookingsUsecase } from "../../Application/useCase/User/Booking/UserBookings.usecase";
import { ISubmitTravelerKycUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Traveler/ISubmitTravelerKycUseCase";
import { SubmitTravelerKycUseCase } from "../../Application/useCase/User/Traveler/SubmitTravelerKyc.usecase";
import { IUpdateUserKycStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/user/IUpdateuSERKycStatusUseCase";
import { UpdateUserKycStatusUseCase } from "../../Application/useCase/User/Traveler/UpdateUserKycStatus.usecase";
import { GetUserOverviewUseCase } from "../../Application/useCase/User/GetUserOverview.usecase";
import { IGetUserOverviewUseCase } from "../../Application/interfaces/useCase_Interfaces/user/IGetUserOverviewUseCase";
import { IGetTravelerKycUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Traveler/IGetTravelerKycUseCase";
import { GetTravelerKycUseCase } from "../../Application/useCase/User/Traveler/GetTravelerKyc.usecase";
import { IReSubmitTravelerKycUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Traveler/IReSubmitTravelerKycUseCase";
import { ReSubmitTravelerKycUseCase } from "../../Application/useCase/User/Traveler/ReSubmitTravelerKyc.usecase";
import { ICreateTravelRequestUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Traveler/ICreateTravelRequestUseCase";
import { CreateTravelRequestUseCase } from "../../Application/useCase/User/Traveler/CreateTravelRequest.usecase";
import { IGetTravelRequestsUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Traveler/IGetTravelRequestsUseCase";
import { GetTravelRequestsUseCase } from "../../Application/useCase/User/Traveler/GetTravelRequests.usecase";
import { GetTravelerTripOverviewUseCase } from "../../Application/useCase/User/Traveler/GetTravelerTripOverview.usecase";
import { IGetTravelerTripOverviewUseCase } from "../../Application/interfaces/useCase_Interfaces/user/Traveler/IGetTravelerTripOverviewUseCase";
import { CalculateBookingPriceUsecase } from "../../Application/useCase/User/Booking/CalculatePricing/CalculateBookingPrice.usecase";
import { ICalculatePriceUsecase } from "../../Application/interfaces/useCase_Interfaces/user/Booking/CalculatePricing/ICalculatePrice";
import { CalculateAgencyPriceUsecase } from "../../Application/useCase/User/Booking/CalculatePricing/CalculateAgencyPrice.usecase";
import { TravelerPricingUsecase } from "../../Application/useCase/User/Booking/CalculatePricing/CalculateTravelerPrice.usecase";
import { ICreateAdminTravelerPricingUsecase } from "../../Application/interfaces/useCase_Interfaces/Princing/ICreateAdminTravelerPricingUsecase";
import { CreateAdminTravelerPricingUsecase } from "../../Application/useCase/Pricing/CreateAdminTravelerPricing.usecase";
import { IFindServiceableTravelerUsecase } from "../../Application/interfaces/useCase_Interfaces/user/Booking/IFindServiceableTravelerUsecase";
import { FindServiceableTravelerUsecase } from "../../Application/useCase/User/Booking/FindServiceableTraveler.usecase";
import { IWithdrawWalletMoneyUseCase } from "../../Application/interfaces/useCase_Interfaces/Wallet/IWithdrawWalletMoneyUseCase";
import { WithdrawWalletMoneyUseCase } from "../../Application/useCase/Wallet/WithdrawWalletMoney.usecase";
import { IBookingPaymentFailedUseCase } from "../../Application/interfaces/useCase_Interfaces/Payment/IBookingPaymentFailedUseCase";
import { BookingPaymentFailedUseCase } from "../../Application/useCase/Payment/BookingPaymentFailed.usecase";



export class UsecaseRegistery {
    static registerUsecase(): void {
        container.register<ISendOtpUseCase>("ISendOtpUseCase", {
            useClass: SendOtpUseCase
        })

        container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase", {
            useClass: VerifyOtpUseCase
        })

        container.register<IResendOtpUseCase>("IResendOtpUseCase", {
            useClass: ResendOtpUseCase
        })

        container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
            useClass: RegisterUserUseCase
        })

        container.register<IRegisterAgencyUseCase>("IRegisterAgencyUseCase", {
            useClass: RegisterAgencyUseCase
        })

        container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
            useClass: GenerateTokenUseCase
        })

        container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase", {
            useClass: RefreshTokenUseCase
        })

        container.register<ILoginUsecase>("ILoginUsecase", {
            useClass: LoginUsecase
        })
        
        container.register<IValidateSessionUseCase>("IValidateSessionUseCase",{
            useClass:ValidateSessionUseCase
        })

        container.register<ILogoutUsecase>("ILogoutUsecase", {
            useClass: LogoutUsecase
        })

        container.register<IVarifyEmailUseCase>("IVarifyEmailUseCase",{
            useClass:VarifyEmailUseCase
        })

        container.register<IResetPasswordUseCase>("IResetPasswordUseCase",{
            useClass:ResetPasswordUseCase
        })

        container.register<IUploadAgencyKycFilesUseCase>("IUploadAgencyKycFilesUseCase", {
            useClass: UploadAgencyKycFilesUseCase
        })

        container.register<ISaveAgencyKycUseCase>("ISaveAgencyKycUseCase", {
            useClass: SaveAgencyKycUseCase
        })

        container.register<IUpdateAgencyKycStatusUseCase>("IUpdateAgencyKycStatusUseCase", {
            useClass: UpdateAgencyKycStatusUseCase
        })

        container.register<IGetAgenciesUseCase>("IGetAgenciesUseCase", {
            useClass: GetAgenciesUseCase
        })

        container.register<IGetUsersUseCase>("IGetUsersUseCase", {
            useClass: GetUsersUseCase
        })

        container.register<IGetAgencyWithKYCUseCase>("IGetAgencyWithKYCUseCase", {
            useClass: GetAgencyWithKYCUseCase
        })

        container.register<IAddHubTempUseCase>("IAddHubTempUseCase", {
            useClass: AddHubTempUseCase
        })

        container.register<IUploadAddFilesUseCase>("IUploadAddFilesUseCase", {
            useClass: UploadAddFilesUseCase
        })

        container.register<IAddHubUseCase>("IAddHubUseCase", {
            useClass: AddHubUseCase
        })

        container.register<IAddNewHubVerifyOtpUseCase>("IAddNewHubVerifyOtpUseCase",{
            useClass:AddNewHubVerifyOtpUseCase
        })

        container.register<IAddNewHubResendOtp>('IAddNewHubResendOtp',{
            useClass:AddNewHubResendOtp
        })

        container.register<ICheckTempHubStatusUseCase>("ICheckTempHubStatusUseCase",{
            useClass:CheckTempHubStatusUseCase
        })

        container.register<IUpdateUserStatusUseCase>("IUpdateUserStatusUseCase",{
            useClass:UpdateUserStatusUseCase
        })

        container.register<IUpdateAgencyStatusUseCase>("IUpdateAgencyStatusUseCase",{
            useClass:UpdateAgencyStatusUseCase
        })

        container.register<IAddWorkerTempUseCase>("IAddWorkerTempUseCase",{
            useClass:AddWorkerTempUseCase
        })

        container.register<IWorkerVerifyOtpUseCase>("IWorkerVerifyOtpUseCase",{
            useClass:WorkerVerifyOtpUseCase
        })

        container.register<IRsubmitAgencyKycUseCase>("IRsubmitAgencyKycUseCase",{
            useClass:RsubmitAgencyKycUseCase
        })

        container.register<IUploadWorkerKycFilesUsecase>("IUploadWorkerKycFilesUsecase",{
            useClass:UploadWorkerKycFilesUsecase
        })

        container.register<IAddWorkerUsecase>("IAddWorkerUsecase",{
            useClass:AddWorkerUsecase
        })

        container.register<IGetHubsUsecase>("IGetHubsUsecase",{
            useClass:GetHubsUsecase
        })

        container.register<IGetUserProfileUseCase>("IGetUserProfileUseCase",{
            useClass:GetUserProfileUseCase
        })

        container.register<IEditUserProfileUseCase>("IEditUserProfileUseCase",{
            useClass:EditUserProfileUseCase
        })

        container.register<IUserReserUserPassword>("IUserReserUserPassword",{
            useClass:UserReserUserPassword
        })

        container.register<IGetAgencyOverviewUseCase>("IGetAgencyOverviewUseCase",{
            useClass:GetAgencyOverviewUseCase
        })

        container.register<IGetPricingUseCase>("IGetPricingUseCase",{
            useClass:GetPricingUseCase
        })

        container.register<IGetAgencyPricingUsecase>("IGetAgencyPricingUsecase",{
            useClass:GetAgencyPricingUsecase
        })

        container.register<IUpsertAgencyPricingUseCase>("IUpsertAgencyPricingUseCase",{
            useClass:UpsertAgencyPricingUseCase
        })

        container.register<ICreateAdminPricingPolicyUseCase>("ICreateAdminPricingPolicyUseCase",{
            useClass:CreateAdminPricingPolicyUseCase
        })

        container.register<IGetAdminProfileUseCase>("IGetAdminProfileUseCase", {    
            useClass: GetAdminProfileUseCase
        });

        container.register<IEditAdminProfileUseCase>("IEditAdminProfileUseCase", {
            useClass: EditAdminProfileUseCase
        }); 

        container.register<IResetAdminPasswordUsecase>("IResetAdminPasswordUsecase", {  
            useClass: ResetAdminPasswordUseCase 
        });

        container.register<IGetAgencyProfileUseCase>("IGetAgencyProfileUseCase", {
            useClass: GetAgencyProfileUseCase
        });
        
        container.register<IEditAgencyProfileUseCase>("IEditAgencyProfileUseCase", {
            useClass: EditAgencyProfileUseCase
        });

        container.register<IResetAgencyPasswordUseCase>("IResetAgencyPasswordUseCase", {
            useClass: ResetAgencyPasswordUseCase
        });

        container.register<ICreateAddressFromLocationUseCase>("ICreateAddressFromLocationUseCase",{
            useClass: CreateAddressFromLocationUseCase
        });

        container.register<IAddUserAddressUseCase>("IAddUserAddressUseCase",{
            useClass: AddUserAddressUseCase
        });

        container.register<IGetUserAddressesUseCase>("IGetUserAddressesUseCase",{
            useClass: GetUserAddressesUseCase
        });

        container.register<IDeleteUserAddressUseCase>("IDeleteUserAddressUseCase",{
            useClass: DeleteUserAddressUseCase
        });

        container.register<ISetDefaultUserAddressUseCase>("ISetDefaultUserAddressUseCase",{
            useClass: SetDefaultUserAddressUseCase
        });

        // container.register<ICheckServiceablePartnersUsecase>("ICheckServiceablePartnersUsecase",{
        //     useClass:CheckServiceablePartnersUsecase
        // })

        container.register<IFindServicableAgencyUsecase>("IFindServicableAgencyUsecase",{
            useClass: FindServicableAgencyUsecase
        });

        // container.register<IGetAddressesByPincodeUsecase>("IGetAddressesByPincodeUsecase",{
        //     useClass:GetAddressesByPincodeUsecase
        // });

        container.register<IGetWorkersUseCase>("IGetWorkersUseCase",{
            useClass:GetWorkersUseCase
        });

        container.register<IGetHubUseCase>("IGetHubUseCase",{
            useClass:GetHubUseCase
        })

        container.register<IGetHubOverviewUseCase>("IGetHubOverviewUseCase",{
            useClass:GetHubOverviewUseCase
        });

        container.register<IUpdateHubKycStatusUseCase>("IUpdateHubKycStatusUseCase",{
            useClass:UpdateHubKycStatusUseCase
        })

        container.register<ICalculateBookingPriceUsecase>("ICalculateBookingPriceUsecase",{
            useClass:CalculateBookingPriceUsecase
        });

        container.register<ICalculatePriceUsecase>("CalculateAgencyPriceUsecase",{
            useClass:CalculateAgencyPriceUsecase
        })

        container.register<ICalculatePriceUsecase>("TravelerPricingUsecase",{
            useClass:TravelerPricingUsecase
        })

        container.register<ICreateBookingUsecase>("ICreateBookingUsecase",{
            useClass:CreateBookingUsecase
        })

        container.register<ICreatePaymentOrderUsecase>("ICreatePaymentOrderUsecase",{
            useClass:CreatePaymentOrderUsecase
        })

        container.register<IGetWalletOverviewUseCase>("IGetWalletOverviewUseCase",{
            useClass:GetWalletOverviewUseCase
        });

        container.register<IGetWalletUseCase>("IGetWalletUseCase",{
            useClass:GetWalletUseCase
        });

        container.register<IWalletTopupSuccessUseCase>("IWalletTopupSuccessUseCase",{
            useClass:WalletTopupSuccessUseCase
        });

        container.register<ICreateWalletTopupOrderUseCase>("ICreateWalletTopupOrderUseCase",{
            useClass:CreateWalletTopupOrderUseCase
        });

        container.register<IGetBookingUsecase>("IGetBookingUsecase",{
            useClass:GetBookingUsecase
        });

        container.register<IBookingPaymentSuccessUseCase>("IBookingPaymentSuccessUseCase",{
            useClass:BookingPaymentSuccessUseCase
        })

        container.register<IBookingPaymentFailedUseCase>("IBookingPaymentFailedUseCase",{
            useClass:BookingPaymentFailedUseCase
        });

        container.register<IUserBookingsUsecase>("IUserBookingsUsecase",{
            useClass:UserBookingsUsecase
        })

        container.register<ISubmitTravelerKycUseCase>("ISubmitTravelerKycUseCase",{
            useClass:SubmitTravelerKycUseCase
        })

        container.register<IUpdateUserKycStatusUseCase>("IUpdateUserKycStatusUseCase",{
            useClass:UpdateUserKycStatusUseCase
        })

        container.register<IGetUserOverviewUseCase>("IGetUserOverviewUseCase",{
            useClass:GetUserOverviewUseCase
        })

        container.register<IGetTravelerKycUseCase>("IGetTravelerKycUseCase",{
            useClass:GetTravelerKycUseCase
        })

        container.register<IReSubmitTravelerKycUseCase>("IReSubmitTravelerKycUseCase",{
            useClass:ReSubmitTravelerKycUseCase
        })

        container.register<ICreateTravelRequestUseCase>("ICreateTravelRequestUseCase",{
            useClass:CreateTravelRequestUseCase
        })

        container.register<IGetTravelRequestsUseCase>("IGetTravelRequestsUseCase",{
            useClass:GetTravelRequestsUseCase
        })

        container.register<IGetTravelerTripOverviewUseCase>("IGetTravelerTripOverviewUseCase",{
            useClass:GetTravelerTripOverviewUseCase
        })

        container.register<ICreateAdminTravelerPricingUsecase>("ICreateAdminTravelerPricingUsecase",{
            useClass:CreateAdminTravelerPricingUsecase
        })

        container.register<IFindServiceableTravelerUsecase>("IFindServiceableTravelerUsecase",{
            useClass:FindServiceableTravelerUsecase
        })

        container.register<IWithdrawWalletMoneyUseCase>("IWithdrawWalletMoneyUseCase",{
            useClass:WithdrawWalletMoneyUseCase
        })
    }
}