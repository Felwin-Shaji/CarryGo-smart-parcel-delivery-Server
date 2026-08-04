import { container } from "tsyringe";
import { SendOtpUseCase } from "../../Application/UseCases/Auth/send-otp.usecase";
import { VerifyOtpUseCase } from "../../Application/UseCases/Auth/verifyOtpUseCase";
import { GenerateTokenUseCase } from "../../Application/UseCases/Auth/GenerateToken.usecase";
import { RegisterUserUseCase } from "../../Application/UseCases/User/RegisterUser.useCase";
import { RefreshTokenUseCase } from "../../Application/UseCases/Auth/refreshToken.usecase";
import { LoginUsecase } from "../../Application/UseCases/Auth/login.usecase";
import type { ILogoutUsecase } from "../../Application/Interfaces/UseCases/Auth/logout.usecase";
import type { IRegisterUserUseCase } from "../../Application/Interfaces/UseCases/User/RegisterUser.useCase";
import type { IRegisterAgencyUseCase } from "../../Application/Interfaces/UseCases/Agency/Agencyregisrtation.usecase";
import { RegisterAgencyUseCase } from "../../Application/UseCases/Agency/RegisterAgency.usecase";
import { IUploadAgencyKycFilesUseCase } from "../../Application/Interfaces/UseCases/Agency/UploadAgencyKycFilesUseCase";
import { UploadAgencyKycFilesUseCase } from "../../Application/UseCases/Agency/UploadAgencyKycFiles.usecase";
import { ISaveAgencyKycUseCase } from "../../Application/Interfaces/UseCases/Agency/SaveAgencyKycUseCase";
import { SaveAgencyKycUseCase } from "../../Application/UseCases/Agency/SaveAgencyKyc.usecase";
import { IUpdateAgencyKycStatusUseCase } from "../../Application/Interfaces/UseCases/Agency/UpdateAgencyKycStatusUseCase";
import { IGetAgenciesUseCase } from "../../Application/Interfaces/UseCases/Agency/GetAgenciesUseCase";
import { GetAgenciesUseCase } from "../../Application/UseCases/Agency/GetAgencies.usecase";
import { IGetUsersUseCase } from "../../Application/Interfaces/UseCases/User/GetUsers.usecase";
import { GetUsersUseCase } from "../../Application/UseCases/User/GetUsers.usecase";
import { IGetAgencyWithKYCUseCase } from "../../Application/Interfaces/UseCases/Agency/GetAgencyWithKYCUseCase";
import { GetAgencyWithKYCUseCase } from "../../Application/UseCases/Agency/GetAgencyWithKYC.usecase";
import { ResendOtpUseCase } from "../../Application/UseCases/Auth/resendotp.usecase";
import { IResendOtpUseCase } from "../../Application/Interfaces/UseCases/Auth/resendOtp.usecase";
import { ISendOtpUseCase } from "../../Application/Interfaces/UseCases/Auth/requestOtp.usecase";
import { IVerifyOtpUseCase } from "../../Application/Interfaces/UseCases/Auth/verifyOtp.interface";
import { IGenerateTokenUseCase } from "../../Application/Interfaces/UseCases/Auth/GenerateToken.usecase";
import { IRefreshTokenUseCase } from "../../Application/Interfaces/UseCases/Auth/refreshToken.usecase";
import { ILoginUsecase } from "../../Application/Interfaces/UseCases/Auth/login.usecase";
import { LogoutUsecase } from "../../Application/UseCases/Auth/logout.usecase";
import { UpdateAgencyKycStatusUseCase } from "../../Application/UseCases/Agency/UpdateAgencyKyc.usecase";
import { IAddHubUseCase } from "../../Application/Interfaces/UseCases/Hub/IAddHubUseCase";
import { AddHubUseCase } from "../../Application/UseCases/Hub/AddHubUseCase";
import { IUploadAddFilesUseCase } from "../../Application/Interfaces/UseCases/Hub/IUploadAddFilesUseCase";
import { UploadAddFilesUseCase } from "../../Application/UseCases/Hub/UploadAddFilesUseCase";
import { IAddHubTempUseCase } from "../../Application/Interfaces/UseCases/Hub/IAddHubTempUseCase";
import { AddHubTempUseCase } from "../../Application/UseCases/Hub/AddNewHubBasicInfo";
import { IAddNewHubResendOtp } from "../../Application/Interfaces/UseCases/Hub/IAddNewHubResendOtp";
import { AddNewHubResendOtp } from "../../Application/UseCases/Hub/AddNewHubReesendOtp";
import { IAddNewHubVerifyOtpUseCase } from "../../Application/Interfaces/UseCases/Hub/IAddNewHubVerifyOtpUseCase";
import { AddNewHubVerifyOtpUseCase } from "../../Application/UseCases/Hub/AddNewHubVerifyOtpUseCase";
import { ICheckTempHubStatusUseCase } from "../../Application/Interfaces/UseCases/Hub/ICheckTempHubStatusUseCase";
import { CheckTempHubStatusUseCase } from "../../Application/UseCases/Hub/CheckTempHubStatusUseCase";
import { IVarifyEmailUseCase } from "../../Application/Interfaces/UseCases/Auth/varifyEmail.usecase";
import { VarifyEmailUseCase } from "../../Application/UseCases/Auth/varifyEmail.usecase";
import { IResetPasswordUseCase } from "../../Application/Interfaces/UseCases/Auth/resetPassword.usecase";
import { ResetPasswordUseCase } from "../../Application/UseCases/Auth/ResetPasswordUseCase";
import { IUpdateUserStatusUseCase } from "../../Application/Interfaces/UseCases/User/UpdateUserStatus.usecase";
import { UpdateUserStatusUseCase } from "../../Application/UseCases/User/UpdateUserStatus.usecase";
import { IUpdateAgencyStatusUseCase } from "../../Application/Interfaces/UseCases/Agency/UpdateAgencyStatusUseCase";
import { UpdateAgencyStatusUseCase } from "../../Application/UseCases/Agency/UpdateAgencyStatus.usecase";
import { IAddWorkerTempUseCase } from "../../Application/Interfaces/UseCases/Worker/addWorkerTempUseCase.interface";
import { AddWorkerTempUseCase } from "../../Application/UseCases/Worker/AddWorkerTempUseCase";
import { IWorkerVerifyOtpUseCase } from "../../Application/Interfaces/UseCases/Worker/addWorkerVerifyOtpUseCase";
import { WorkerVerifyOtpUseCase } from "../../Application/UseCases/Worker/addWorkerVerifyOtpUseCase";
import { IRsubmitAgencyKycUseCase } from "../../Application/Interfaces/UseCases/Agency/ResubmitAgencyKycUseCase";
import { RsubmitAgencyKycUseCase } from "../../Application/UseCases/Agency/ResubmitAgencyKyc.usecase";
import { IUploadWorkerKycFilesUsecase } from "../../Application/Interfaces/UseCases/Worker/uploadWorkerKycFilesUsecase";
import { UploadWorkerKycFilesUsecase } from "../../Application/UseCases/Worker/UploadWorkerKycFiles.usecase";
import { IAddWorkerUsecase } from "../../Application/Interfaces/UseCases/Worker/AddWorkerUsecase";
import { AddWorkerUsecase } from "../../Application/UseCases/Worker/AddWorkerUsecase";
import { IGetHubsUsecase } from "../../Application/Interfaces/UseCases/Hub/IGetHubsUsecase";
import { GetHubsUsecase } from "../../Application/UseCases/Hub/GetHubsUseCase";
import { IGetUserProfileUseCase } from "../../Application/Interfaces/UseCases/User/GetUserProfile.useCase";
import { GetUserProfileUseCase } from "../../Application/UseCases/User/GetUserProfile.usecase";
import { IEditUserProfileUseCase } from "../../Application/Interfaces/UseCases/User/EditUserProfile.usecase";
import { EditUserProfileUseCase } from "../../Application/UseCases/User/EditUserProfile.usecase";
import { IUserReserUserPassword } from "../../Application/Interfaces/UseCases/User/ReserUserPassword.usecase";
import { UserReserUserPassword } from "../../Application/UseCases/User/ReserUserPassword.usecase";
import { IGetAgencyOverviewUseCase } from "../../Application/Interfaces/UseCases/Agency/GetAgencyOverview.usecase";
import { GetAgencyOverviewUseCase } from "../../Application/UseCases/Agency/GetAgencyOverview.usecase";
import { IGetPricingUseCase } from "../../Application/Interfaces/UseCases/Pricing/getPricing.usecase";
import { GetPricingUseCase } from "../../Application/UseCases/Pricing/GetPricingPolicy.usecase";
import { GetAgencyPricingUsecase } from "../../Application/UseCases/Pricing/GetAgencyPricing.usecase";
import { IGetAgencyPricingUsecase } from "../../Application/Interfaces/UseCases/Pricing/IGetAgencyPricingUsecase";
import { IUpsertAgencyPricingUseCase } from "../../Application/Interfaces/UseCases/Pricing/IUpsertAgencyPricingUseCase";
import { UpsertAgencyPricingUseCase } from "../../Application/UseCases/Pricing/UpsertAgencyPricing.usecase";
import { CreateAdminPricingPolicyUseCase } from "../../Application/UseCases/Pricing/CreateAdminPricingPolicy.usecase";
import { ICreateAdminPricingPolicyUseCase } from "../../Application/Interfaces/UseCases/Pricing/ICreateAdminPricingPolicyUseCase";
import { IGetAdminProfileUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminProfileUseCase";
import { GetAdminProfileUseCase } from "../../Application/UseCases/Admin/getAdminProfile.usecase";
import { EditAdminProfileUseCase } from "../../Application/UseCases/Admin/editAdminProfile.usecase";
import { IEditAdminProfileUseCase } from "../../Application/Interfaces/UseCases/Admin/IEditAdminProfileUseCase";
import { ResetAdminPasswordUseCase } from "../../Application/UseCases/Admin/resetAdminPassword.usecase";
import { IResetAdminPasswordUsecase } from "../../Application/Interfaces/UseCases/Admin/IResetAdminPasswordUscase";
import { GetAgencyProfileUseCase } from "../../Application/UseCases/Agency/getAgencyProfile.usecase";
import { IGetAgencyProfileUseCase } from "../../Application/Interfaces/UseCases/Agency/IGetAgencyProfileUseCase";
import { EditAgencyProfileUseCase } from "../../Application/UseCases/Agency/editAgencyProfile.usecase";
import { IEditAgencyProfileUseCase } from "../../Application/Interfaces/UseCases/Agency/IEditAgencyProfileUseCase";
import { ResetAgencyPasswordUseCase } from "../../Application/UseCases/Agency/resetAgencyPassword.usecase";
import { IResetAgencyPasswordUseCase } from "../../Application/Interfaces/UseCases/Agency/IResetAgencyPasswordUseCase";
import { ICreateAddressFromLocationUseCase } from "../../Application/Interfaces/UseCases/User/Address/ICreateAddressFromLocationUseCase";
import { CreateAddressFromLocationUseCase } from "../../Application/UseCases/User/Address/CreateAddressFromLocation.usecase";
import { AddUserAddressUseCase } from "../../Application/UseCases/User/Address/addUserAddress.usecase";
import { IAddUserAddressUseCase } from "../../Application/Interfaces/UseCases/User/Address/IAddUserAddressUseCase";
import { IGetUserAddressesUseCase } from "../../Application/Interfaces/UseCases/User/Address/IGetUserAddressesUseCase";
import { GetUserAddressesUseCase } from "../../Application/UseCases/User/Address/getUserAddresses.usecase";
import { IDeleteUserAddressUseCase } from "../../Application/Interfaces/UseCases/User/Address/IDeleteUserAddressUseCase";
import { DeleteUserAddressUseCase } from "../../Application/UseCases/User/Address/deleteUserAddressu.secase";
import { ISetDefaultUserAddressUseCase } from "../../Application/Interfaces/UseCases/User/Address/ISetDefaultUserAddressUseCase";
import { SetDefaultUserAddressUseCase } from "../../Application/UseCases/User/Address/setDefaultUserAddress.usecase";
import { IFindServicableAgencyUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IFindServicableAgencyUsecase";
import { FindServicableAgencyUsecase } from "../../Application/UseCases/User/Booking/findServicableAgency.usecase";
import { IGetWorkersUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkersUseCase";
import { GetWorkersUseCase } from "../../Application/UseCases/Worker/GetWorkers.usecase";
import { IGetHubUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubUseCase";
import { GetHubUseCase } from "../../Application/UseCases/Hub/GetHub.usecase";
import { IGetHubOverviewUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubOverviewUseCase";
import { GetHubOverviewUseCase } from "../../Application/UseCases/Hub/GetHubOverview.usecase";
import { IUpdateHubKycStatusUseCase } from "../../Application/Interfaces/UseCases/Hub/IUpdateHubKycStatusUseCase";
import { UpdateHubKycStatusUseCase } from "../../Application/UseCases/Hub/UpdateHubKycStatus.usecase";
import { ICalculateBookingPriceUsecase } from "../../Application/Interfaces/UseCases/User/Booking/ICalculateBookingPriceUsecase";
import { ICreateBookingUsecase } from "../../Application/Interfaces/UseCases/User/Booking/ICreateBookingUsecase";
import { CreateBookingUsecase } from "../../Application/UseCases/User/Booking/CreateBooking.usecase";
import { ICreatePaymentOrderUsecase } from "../../Application/Interfaces/UseCases/Payment/ICreatePaymentOrderUsecase";
import { CreatePaymentOrderUsecase } from "../../Application/UseCases/Payment/CreatePaymentOrder.usecase";
import { IValidateSessionUseCase } from "../../Application/Interfaces/UseCases/Auth/IValidateSessionUseCase";
import { ValidateSessionUseCase } from "../../Application/UseCases/Auth/ValidateSession.usecase";
import { IGetWalletOverviewUseCase } from "../../Application/Interfaces/UseCases/Wallet/IGetWalletOverviewUseCase";
import { GetWalletOverviewUseCase } from "../../Application/UseCases/Wallet/GetWalletOverview.usecase";
import { IGetWalletUseCase } from "../../Application/Interfaces/UseCases/Wallet/IGetWalletUseCase";
import { GetWalletUseCase } from "../../Application/UseCases/Wallet/GetWallet.usecase";
import { IWalletTopupSuccessUseCase } from "../../Application/Interfaces/UseCases/Wallet/IWalletTopupSuccessUseCase";
import { WalletTopupSuccessUseCase } from "../../Application/UseCases/Wallet/WalletTopupSuccess.usecase";
import { ICreateWalletTopupOrderUseCase } from "../../Application/Interfaces/UseCases/Wallet/ICreateWalletTopupOrderUseCase";
import { CreateWalletTopupOrderUseCase } from "../../Application/UseCases/Wallet/CreateWalletTopupOrder.usecase";
import { IGetBookingUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IGetBookingUsecase";
import { GetBookingUsecase } from "../../Application/UseCases/User/Booking/GetBooking.usecase";
import { IBookingPaymentSuccessUseCase } from "../../Application/Interfaces/UseCases/Payment/IBookingPaymentSuccessUseCase";
import { BookingPaymentSuccessUseCase } from "../../Application/UseCases/Payment/BookingPaymentSuccess.usecase";
import { IUserBookingsUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IUserBookingsUsecase";
import { UserBookingsUsecase } from "../../Application/UseCases/User/Booking/UserBookings.usecase";
import { ISubmitTravelerKycUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/ISubmitTravelerKycUseCase";
import { SubmitTravelerKycUseCase } from "../../Application/UseCases/User/Traveler/SubmitTravelerKyc.usecase";
import { IUpdateUserKycStatusUseCase } from "../../Application/Interfaces/UseCases/User/IUpdateuSERKycStatusUseCase";
import { UpdateUserKycStatusUseCase } from "../../Application/UseCases/User/Traveler/UpdateUserKycStatus.usecase";
import { GetUserOverviewUseCase } from "../../Application/UseCases/User/GetUserOverview.usecase";
import { IGetUserOverviewUseCase } from "../../Application/Interfaces/UseCases/User/IGetUserOverviewUseCase";
import { IGetTravelerKycUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/IGetTravelerKycUseCase";
import { GetTravelerKycUseCase } from "../../Application/UseCases/User/Traveler/GetTravelerKyc.usecase";
import { IReSubmitTravelerKycUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/IReSubmitTravelerKycUseCase";
import { ReSubmitTravelerKycUseCase } from "../../Application/UseCases/User/Traveler/ReSubmitTravelerKyc.usecase";
import { ICreateTravelRequestUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/ICreateTravelRequestUseCase";
import { CreateTravelRequestUseCase } from "../../Application/UseCases/User/Traveler/CreateTravelRequest.usecase";
import { IGetTravelRequestsUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/IGetTravelRequestsUseCase";
import { GetTravelRequestsUseCase } from "../../Application/UseCases/User/Traveler/GetTravelRequests.usecase";
import { GetTravelerTripOverviewUseCase } from "../../Application/UseCases/User/Traveler/GetTravelerTripOverview.usecase";
import { IGetTravelerTripOverviewUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/IGetTravelerTripOverviewUseCase";
import { CalculateBookingPriceUsecase } from "../../Application/UseCases/User/Booking/CalculatePricing/CalculateBookingPrice.usecase";
import { ICalculatePriceUsecase } from "../../Application/Interfaces/UseCases/User/Booking/CalculatePricing/ICalculatePrice";
import { CalculateAgencyPriceUsecase } from "../../Application/UseCases/User/Booking/CalculatePricing/CalculateAgencyPrice.usecase";
import { TravelerPricingUsecase } from "../../Application/UseCases/User/Booking/CalculatePricing/CalculateTravelerPrice.usecase";
import { ICreateAdminTravelerPricingUsecase } from "../../Application/Interfaces/UseCases/Pricing/ICreateAdminTravelerPricingUsecase";
import { CreateAdminTravelerPricingUsecase } from "../../Application/UseCases/Pricing/CreateAdminTravelerPricing.usecase";
import { IFindServiceableTravelerUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IFindServiceableTravelerUsecase";
import { FindServiceableTravelerUsecase } from "../../Application/UseCases/User/Booking/FindServiceableTraveler.usecase";
import { IWithdrawWalletMoneyUseCase } from "../../Application/Interfaces/UseCases/Wallet/IWithdrawWalletMoneyUseCase";
import { WithdrawWalletMoneyUseCase } from "../../Application/UseCases/Wallet/WithdrawWalletMoney.usecase";
import { IBookingPaymentFailedUseCase } from "../../Application/Interfaces/UseCases/Payment/IBookingPaymentFailedUseCase";
import { BookingPaymentFailedUseCase } from "../../Application/UseCases/Payment/BookingPaymentFailed.usecase";
import { ICheckTempWorkerStatusUseCase } from "../../Application/Interfaces/UseCases/Worker/ICheckTempWorkerStatusUseCase";
import { CheckTempWorkerStatusUseCase } from "../../Application/UseCases/Worker/CheckTempWorkerStatus.usecase";
import { ICreateRouteGroupUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/ICreateRouteGroupUseCase";
import { CreateRouteGroupUseCase } from "../../Application/UseCases/Agency/RouteGroup/CreateRouteGroup.usecase";
import { IGetPaginatedRouteGroupUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/IGetPaginatedRouteGroupUseCase";
import { GetPaginatedRouteGroupUseCase } from "../../Application/UseCases/Agency/RouteGroup/GetPaginatedRouteGroup.usecase";
import { ICreateRouteSegmentUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/ICreateRouteSegmentUseCase";
import { CreateRouteSegmentUseCase } from "../../Application/UseCases/Agency/RouteGroup/CreateRouteSegment.usecase";
import { IGetRouteGroupDetailUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/IGetRouteDetailsUsecase";
import { GetRouteGroupDetailUseCase } from "../../Application/UseCases/Agency/RouteGroup/GetRouteGroupDetail.usecase";
import { ICreateParcelRouteUsecase } from "../../Application/Interfaces/UseCases/Logistics/ParcelRoute/ICreateParcelRouteUsecase";
import { CreateParcelRouteUsecase } from "../../Application/UseCases/Logistics/CreateParcelRoute.usecase";
import { ICreateHubShipmentsUsecase } from "../../Application/Interfaces/UseCases/Logistics/ICreateHubShipmentsUsecase";
import { CreateHubShipmentsUsecase } from "../../Application/UseCases/Logistics/CreateHubShipments.usecase";
import { IGetWorkerOverviewUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerOverviewUseCase";
import { GetWorkerOverviewUseCase } from "../../Application/UseCases/Worker/GetWorkerOverview.usecase";
import { IReSubmitWorkerKycUseCase } from "../../Application/Interfaces/UseCases/Worker/IReSubmitWorkerKycUseCase";
import { ReSubmitWorkerKycUseCase } from "../../Application/UseCases/Worker/ReSubmitWorkerKyc.usecase";
import { IGetWorkerKycUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerKycUseCase";
import { GetWorkerKycUseCase } from "../../Application/UseCases/Worker/GetWorkerKyc.usecase";
import { IUpdateWorkerKycStatusUseCase } from "../../Application/Interfaces/UseCases/Worker/IUpdateWorkerKycStatusUseCase";
import { UpdateWorkerKycStatusUseCase } from "../../Application/UseCases/Worker/UpdateWorkerKycStatus.usecase";
import { ICreateHubShipmentPickUpUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/ICreateHubShipmentPickUpUsecase";
import { CreateHubShipmentPickUpUsecase } from "../../Application/UseCases/Logistics/HubShipment/CreateHubShipmentPickUp.usecase";
import { IGetShipmentsUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/IGetShipmentsUsecase";
import { GetShipmentsUsecase } from "../../Application/UseCases/Logistics/HubShipment/GetShipments.usecase";
import { IGetShipmentDetailsUsecase } from "../../Application/Interfaces/UseCases/Logistics/ShipmentParcel/IGetShipmentDetailsUsecase";
import { GetShipmentDetailsUsecase } from "../../Application/UseCases/Logistics/ShipmentParcel/GetShipmentDetails.usecase";
import { IUpdateHubShipmentUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/IUpdateHubShipmentUsecase";
import { UpdateHubShipmentUsecase } from "../../Application/UseCases/Logistics/HubShipment/UpdateHubShipment.usecase";
import { IGetWorkersShipmentUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/IGetWorkersShipmentUsecase";
import { GetWorkersShipmentUsecase } from "../../Application/UseCases/Logistics/HubShipment/GetWorkersShipment.usecase";
import { IGetWorkerShipmentDetailsUsecase } from "../../Application/Interfaces/UseCases/Logistics/ShipmentParcel/IGetWorkerShipmentDetailsUsecase";
import { GetWorkerShipmentDetailsUsecase } from "../../Application/UseCases/Logistics/ShipmentParcel/GetWorkerShipmentDetails.usecase";
import { IUpdateShipmentStatusUsecase } from "../../Application/Interfaces/UseCases/Logistics/ShipmentParcel/IUpdateShipmentStatusUsecase";
import { UpdateShipmentStatusUsecase } from "../../Application/UseCases/Logistics/ShipmentParcel/UpdateShipmentStatus.usecase";
import { IGetAgencyTrackingUsecase } from "../../Application/Interfaces/UseCases/Logistics/Tracking/IGetAgencyTrackingUsecase";
import { GetAgencyTrackingUsecase } from "../../Application/UseCases/Logistics/Tracking/GetAgencyTracking.usecase";
import { IBulkUpdateShipmentParcelUsecase } from "../../Application/Interfaces/UseCases/Logistics/ShipmentParcel/IBulkUpdateShipmentParcelUsecase";
import { BulkUpdateShipmentParcelUsecase } from "../../Application/UseCases/Logistics/ShipmentParcel/BulkUpdateShipmentParcel.usecase";
import { ICreateHubShipmentOutForDeliveryUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/ICreateHubShipmentOutForDeliveryUsecase";
import { CreateHubShipmentOutForDeliveryUsecase } from "../../Application/UseCases/Logistics/HubShipment/CreateHubShipmentOutForDelivery.usecase";
import { IUpdateBookingStatusUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IUpdateBookingStatusUsecase";
import { UpdateBookingStatusUsecase } from "../../Application/UseCases/User/Booking/UpdateBookingStatus.usecase";
import { GetTravelerTrackingUsecase } from "../../Application/UseCases/Logistics/Tracking/GetTravelerTracking.usecase";
import { IGetTravelerTrackingUsecase } from "../../Application/Interfaces/UseCases/Logistics/Tracking/IGetTravelerTrackingUsecase";
import { IGetTrackingUsecase } from "../../Application/Interfaces/UseCases/Logistics/Tracking/IGetTrackingUsecase";
import { GetTrackingUsecase } from "../../Application/UseCases/Logistics/Tracking/GetTracking.usecase";
import { IGetOrCreateChatUseCase } from "../../Application/Interfaces/UseCases/Chat/IGetOrCreateChatUseCase";
import { GetOrCreateChatUseCase } from "../../Application/UseCases/Chat/GetOrCreateChat.usecase";
import { IGetMessagesUsecase } from "../../Application/Interfaces/UseCases/Chat/IGetMessagesUsecase";
import { GetMessagesUsecase } from "../../Application/UseCases/Chat/GetMessages.usecase";
import { ISendMessageUseCase } from "../../Application/Interfaces/UseCases/Chat/ISendMessageUseCase";
import { SendMessageUseCase } from "../../Application/UseCases/Chat/SendMessage.usecase";
import { IGetWorkerParcelsUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerParcelsUseCase";
import { GetWorkerParcelsUseCase } from "../../Application/UseCases/Worker/GetWorkerParcels.usecase";
import { IGetWorkerDashboardUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerDashboardUseCase";
import { GetWorkerDashboardUseCase } from "../../Application/UseCases/Worker/GetWorkerDashboard.usecase";
import { IGetWorkerGraphUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerGraphUseCase";
import { GetWorkerGraphUseCase } from "../../Application/UseCases/Worker/GetWorkerGraph.usecase";
import { IGetHubProfileUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubProfileUseCase";
import { GetHubProfileUseCase } from "../../Application/UseCases/Hub/GetHubProfile.usecase";
import { IEditHubProfileUseCase } from "../../Application/Interfaces/UseCases/Hub/IEditHubProfileUseCase";
import { EditHubProfileUseCase } from "../../Application/UseCases/Hub/EditHubProfile.usecase";
import { IResetHubPasswordUseCase } from "../../Application/Interfaces/UseCases/Hub/IResetHubPasswordUseCase";
import { ResetHubPasswordUseCase } from "../../Application/UseCases/Hub/ResetHubPassword.usecase";
import { IGetHubDashboardSummaryUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubDashboardSummaryUseCase";
import { GetHubDashboardSummaryUseCase } from "../../Application/UseCases/Hub/GetHubDashboardSummary.usecase";
import { GetHubDashboardTrendUseCase } from "../../Application/UseCases/Hub/GetHubDashboardTrend.usecase";
import { IGetHubDashboardTrendUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubDashboardTrendUseCase";
import { GetHubDashboardTypesUseCase } from "../../Application/UseCases/Hub/GetHubDashboardTypes.usecase";
import { IGetHubDashboardTypesUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubDashboardTypesUseCase";
import { IGetHubDashboardShipmentsPreviewUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubDashboardShipmentsPreviewUseCase";
import { GetHubDashboardShipmentsPreviewUseCase } from "../../Application/UseCases/Hub/GetHubDashboardShipmentsPreview.usecase";
import { IAgencyGetDashboardUsecase } from "../../Application/Interfaces/UseCases/Agency/IAgencyGetDashboardUseCase";
import { AgencyGetDashboardUsecase } from "../../Application/UseCases/Agency/AgencyGetDashboard.usecase";
import { IAgencyGetSalesReportUseCase } from "../../Application/Interfaces/UseCases/Agency/IAgencyGetSalesReportUseCase";
import { AgencyGetSalesReportUseCase } from "../../Application/UseCases/Agency/AgencyGetSalesReport.usecase";
import { IAgencyGetSalesChartUseCase } from "../../Application/Interfaces/UseCases/Agency/IAgencyGetSalesChartUseCase";
import { AgencyGetSalesChartUseCase } from "../../Application/UseCases/Agency/AgencyGetSalesChart.usecase";
import { IAgencyGetDeliveriesChartUseCase } from "../../Application/Interfaces/UseCases/Agency/IAgencyGetDeliveriesChartUseCase";
import { AgencyGetDeliveriesChartUseCase } from "../../Application/UseCases/Agency/AgencyGetDeliveriesChart.usecase";
import { IAgencyExportSalesReportUseCase } from "../../Application/Interfaces/UseCases/Agency/IAgencyExportSalesReportUsecase";
import { AgencyExportSalesReportUseCase } from "../../Application/UseCases/Agency/AgencyExportSalesReport.usecase";
import { INotificationRepository } from "../../Application/Interfaces/Repositories/Notification/INotificationRepository";
import { NotificationRepository } from "../repositories/Notification/Notification.repository";
import { IGetNotificationsUseCase } from "../../Application/Interfaces/UseCases/Notification/IGetNotificationsUseCase";
import { GetNotificationsUseCase } from "../../Application/UseCases/Notification/GetNotifications.usecase";
import { IMarkAsReadUseCase } from "../../Application/Interfaces/UseCases/Notification/IMarkAsReadUseCase";
import { MarkAsReadUseCase } from "../../Application/UseCases/Notification/MarkAsRead.usecase";
import { IMarkAllAsReadUseCase } from "../../Application/Interfaces/UseCases/Notification/IMarkAllAsReadUseCase";
import { MarkAllAsReadUseCase } from "../../Application/UseCases/Notification/MarkAllAsRead.usecase";
import { GetUnreadCountUseCase } from "../../Application/UseCases/Notification/GetUnreadCount.usecase";
import { IGetUnreadCountUseCase } from "../../Application/Interfaces/UseCases/Notification/IGetUnreadCountUseCase";
import { IWorkerResendOtpUseCase } from "../../Application/Interfaces/UseCases/Worker/IWorkerResendOtpUseCase";
import { WorkerResendOtpUseCase } from "../../Application/UseCases/Worker/WorkerResendOtp.usecase";
import { IGoogleAuthUseCase } from "../../Application/Interfaces/UseCases/Auth/IGoogleAuthUseCase";
import { GoogleAuthUseCase } from "../../Application/UseCases/Auth/GoogleAuthUseCase";
import { IUpdateRouteGroupStatusUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/IUpdateRouteGroupStatusUseCase";
import { UpdateRouteGroupStatusUseCase } from "../../Application/UseCases/Agency/RouteGroup/UpdateRouteGroupStatus.usecase";
import { IGetAdminDashboardOverviewUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminDashboardOverviewUseCase";
import { GetAdminDashboardOverviewUseCase } from "../../Application/UseCases/Admin/GetAdminDashboardOverview.usecase";
import { IGetAdminRevenueChartUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminRevenueChartUseCase";
import { GetAdminRevenueChartUseCase } from "../../Application/UseCases/Admin/GetAdminRevenueChart.usecase";
import { IGetAdminBookingsChartUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminBookingsChartUseCase";
import { GetAdminBookingsChartUseCase } from "../../Application/UseCases/Admin/GetAdminBookingsChart.usecase";
import { IGetAdminBookingsReportUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminBookingsReportUseCase";
import { GetAdminBookingsReportUseCase } from "../../Application/UseCases/Admin/GetAdminBookingsReport.usecase";
import { IExportAdminBookingsReportUseCase } from "../../Application/Interfaces/UseCases/Admin/IExportAdminBookingsReportUseCase";
import { ExportAdminBookingsReportUseCase } from "../../Application/UseCases/Admin/ExportAdminBookingsReport.usecase";
import { IGetWorkerProfileUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerProfileUseCase";
import { GetWorkerProfileUseCase } from "../../Application/UseCases/Worker/GetWorkerProfileUseCase";
import { IEditWorkerProfileUseCase } from "../../Application/Interfaces/UseCases/Worker/IEditWorkerProfileUseCase";
import { EditWorkerProfileUseCase } from "../../Application/UseCases/Worker/EditWorkerProfile.usecase";
import { IResetWorkerPasswordUseCase } from "../../Application/Interfaces/UseCases/Worker/IResetWorkerPasswordUseCase";
import { ResetWorkerPasswordUseCase } from "../../Application/UseCases/Worker/ResetWorkerPassword.usecase";
import { IResubmitHubUseCase } from "../../Application/Interfaces/UseCases/Hub/IResubmitHubUseCase";
import { ResubmitHubUseCase } from "../../Application/UseCases/Hub/ResubmitHubUseCase";



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

        container.register<IValidateSessionUseCase>("IValidateSessionUseCase", {
            useClass: ValidateSessionUseCase
        })

        container.register<ILogoutUsecase>("ILogoutUsecase", {
            useClass: LogoutUsecase
        })

        container.register<IVarifyEmailUseCase>("IVarifyEmailUseCase", {
            useClass: VarifyEmailUseCase
        })

        container.register<IResetPasswordUseCase>("IResetPasswordUseCase", {
            useClass: ResetPasswordUseCase
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

        container.register<IAddNewHubVerifyOtpUseCase>("IAddNewHubVerifyOtpUseCase", {
            useClass: AddNewHubVerifyOtpUseCase
        })

        container.register<IAddNewHubResendOtp>('IAddNewHubResendOtp', {
            useClass: AddNewHubResendOtp
        })

        container.register<ICheckTempHubStatusUseCase>("ICheckTempHubStatusUseCase", {
            useClass: CheckTempHubStatusUseCase
        })

        container.register<IUpdateUserStatusUseCase>("IUpdateUserStatusUseCase", {
            useClass: UpdateUserStatusUseCase
        })

        container.register<IUpdateAgencyStatusUseCase>("IUpdateAgencyStatusUseCase", {
            useClass: UpdateAgencyStatusUseCase
        })

        container.register<ICheckTempWorkerStatusUseCase>("ICheckTempWorkerStatusUseCase", {
            useClass: CheckTempWorkerStatusUseCase
        })

        container.register<IAddWorkerTempUseCase>("IAddWorkerTempUseCase", {
            useClass: AddWorkerTempUseCase
        })

        container.register<IWorkerVerifyOtpUseCase>("IWorkerVerifyOtpUseCase", {
            useClass: WorkerVerifyOtpUseCase
        })

        container.register<IRsubmitAgencyKycUseCase>("IRsubmitAgencyKycUseCase", {
            useClass: RsubmitAgencyKycUseCase
        })

        container.register<IUploadWorkerKycFilesUsecase>("IUploadWorkerKycFilesUsecase", {
            useClass: UploadWorkerKycFilesUsecase
        })

        container.register<IAddWorkerUsecase>("IAddWorkerUsecase", {
            useClass: AddWorkerUsecase
        })

        container.register<IGetHubsUsecase>("IGetHubsUsecase", {
            useClass: GetHubsUsecase
        })

        container.register<IGetUserProfileUseCase>("IGetUserProfileUseCase", {
            useClass: GetUserProfileUseCase
        })

        container.register<IEditUserProfileUseCase>("IEditUserProfileUseCase", {
            useClass: EditUserProfileUseCase
        })

        container.register<IUserReserUserPassword>("IUserReserUserPassword", {
            useClass: UserReserUserPassword
        })

        container.register<IGetAgencyOverviewUseCase>("IGetAgencyOverviewUseCase", {
            useClass: GetAgencyOverviewUseCase
        })

        container.register<IGetPricingUseCase>("IGetPricingUseCase", {
            useClass: GetPricingUseCase
        })

        container.register<IGetAgencyPricingUsecase>("IGetAgencyPricingUsecase", {
            useClass: GetAgencyPricingUsecase
        })

        container.register<IUpsertAgencyPricingUseCase>("IUpsertAgencyPricingUseCase", {
            useClass: UpsertAgencyPricingUseCase
        })

        container.register<ICreateAdminPricingPolicyUseCase>("ICreateAdminPricingPolicyUseCase", {
            useClass: CreateAdminPricingPolicyUseCase
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

        container.register<ICreateAddressFromLocationUseCase>("ICreateAddressFromLocationUseCase", {
            useClass: CreateAddressFromLocationUseCase
        });

        container.register<IAddUserAddressUseCase>("IAddUserAddressUseCase", {
            useClass: AddUserAddressUseCase
        });

        container.register<IGetUserAddressesUseCase>("IGetUserAddressesUseCase", {
            useClass: GetUserAddressesUseCase
        });

        container.register<IDeleteUserAddressUseCase>("IDeleteUserAddressUseCase", {
            useClass: DeleteUserAddressUseCase
        });

        container.register<ISetDefaultUserAddressUseCase>("ISetDefaultUserAddressUseCase", {
            useClass: SetDefaultUserAddressUseCase
        });

        // container.register<ICheckServiceablePartnersUsecase>("ICheckServiceablePartnersUsecase",{
        //     useClass:CheckServiceablePartnersUsecase
        // })

        container.register<IFindServicableAgencyUsecase>("IFindServicableAgencyUsecase", {
            useClass: FindServicableAgencyUsecase
        });

        // container.register<IGetAddressesByPincodeUsecase>("IGetAddressesByPincodeUsecase",{
        //     useClass:GetAddressesByPincodeUsecase
        // });

        container.register<IGetWorkersUseCase>("IGetWorkersUseCase", {
            useClass: GetWorkersUseCase
        });

        container.register<IGetHubUseCase>("IGetHubUseCase", {
            useClass: GetHubUseCase
        })

        container.register<IGetHubOverviewUseCase>("IGetHubOverviewUseCase", {
            useClass: GetHubOverviewUseCase
        });

        container.register<IUpdateHubKycStatusUseCase>("IUpdateHubKycStatusUseCase", {
            useClass: UpdateHubKycStatusUseCase
        })

        container.register<ICalculateBookingPriceUsecase>("ICalculateBookingPriceUsecase", {
            useClass: CalculateBookingPriceUsecase
        });

        container.register<ICalculatePriceUsecase>("CalculateAgencyPriceUsecase", {
            useClass: CalculateAgencyPriceUsecase
        })

        container.register<ICalculatePriceUsecase>("TravelerPricingUsecase", {
            useClass: TravelerPricingUsecase
        })

        container.register<ICreateBookingUsecase>("ICreateBookingUsecase", {
            useClass: CreateBookingUsecase
        })

        container.register<ICreatePaymentOrderUsecase>("ICreatePaymentOrderUsecase", {
            useClass: CreatePaymentOrderUsecase
        })

        container.register<IGetWalletOverviewUseCase>("IGetWalletOverviewUseCase", {
            useClass: GetWalletOverviewUseCase
        });

        container.register<IGetWalletUseCase>("IGetWalletUseCase", {
            useClass: GetWalletUseCase
        });

        container.register<IWalletTopupSuccessUseCase>("IWalletTopupSuccessUseCase", {
            useClass: WalletTopupSuccessUseCase
        });

        container.register<ICreateWalletTopupOrderUseCase>("ICreateWalletTopupOrderUseCase", {
            useClass: CreateWalletTopupOrderUseCase
        });

        container.register<IGetBookingUsecase>("IGetBookingUsecase", {
            useClass: GetBookingUsecase
        });

        container.register<IBookingPaymentSuccessUseCase>("IBookingPaymentSuccessUseCase", {
            useClass: BookingPaymentSuccessUseCase
        })

        container.register<IBookingPaymentFailedUseCase>("IBookingPaymentFailedUseCase", {
            useClass: BookingPaymentFailedUseCase
        });

        container.register<IUserBookingsUsecase>("IUserBookingsUsecase", {
            useClass: UserBookingsUsecase
        })

        container.register<ISubmitTravelerKycUseCase>("ISubmitTravelerKycUseCase", {
            useClass: SubmitTravelerKycUseCase
        })

        container.register<IUpdateUserKycStatusUseCase>("IUpdateUserKycStatusUseCase", {
            useClass: UpdateUserKycStatusUseCase
        })

        container.register<IGetUserOverviewUseCase>("IGetUserOverviewUseCase", {
            useClass: GetUserOverviewUseCase
        })

        container.register<IGetTravelerKycUseCase>("IGetTravelerKycUseCase", {
            useClass: GetTravelerKycUseCase
        })

        container.register<IReSubmitTravelerKycUseCase>("IReSubmitTravelerKycUseCase", {
            useClass: ReSubmitTravelerKycUseCase
        })

        container.register<ICreateTravelRequestUseCase>("ICreateTravelRequestUseCase", {
            useClass: CreateTravelRequestUseCase
        })

        container.register<IGetTravelRequestsUseCase>("IGetTravelRequestsUseCase", {
            useClass: GetTravelRequestsUseCase
        })

        container.register<IGetTravelerTripOverviewUseCase>("IGetTravelerTripOverviewUseCase", {
            useClass: GetTravelerTripOverviewUseCase
        })

        container.register<ICreateAdminTravelerPricingUsecase>("ICreateAdminTravelerPricingUsecase", {
            useClass: CreateAdminTravelerPricingUsecase
        })

        container.register<IFindServiceableTravelerUsecase>("IFindServiceableTravelerUsecase", {
            useClass: FindServiceableTravelerUsecase
        })

        container.register<IWithdrawWalletMoneyUseCase>("IWithdrawWalletMoneyUseCase", {
            useClass: WithdrawWalletMoneyUseCase
        });

        container.register<ICreateRouteGroupUseCase>("ICreateRouteGroupUseCase", {
            useClass: CreateRouteGroupUseCase
        })

        container.register<IGetPaginatedRouteGroupUseCase>("IGetPaginatedRouteGroupUseCase", {
            useClass: GetPaginatedRouteGroupUseCase
        })

        container.register<ICreateRouteSegmentUseCase>("ICreateRouteSegmentUseCase", {
            useClass: CreateRouteSegmentUseCase
        })

        container.register<IGetRouteGroupDetailUseCase>("IGetRouteGroupDetailUseCase", {
            useClass: GetRouteGroupDetailUseCase
        })

        container.register<ICreateParcelRouteUsecase>("ICreateParcelRouteUsecase", {
            useClass: CreateParcelRouteUsecase
        });

        container.register<ICreateHubShipmentsUsecase>("ICreateHubShipmentsUsecase", {
            useClass: CreateHubShipmentsUsecase
        })

        container.register<IGetWorkerOverviewUseCase>("IGetWorkerOverviewUseCase", {
            useClass: GetWorkerOverviewUseCase
        })

        container.register<IReSubmitWorkerKycUseCase>("IReSubmitWorkerKycUseCase", {
            useClass: ReSubmitWorkerKycUseCase
        });

        container.register<IGetWorkerKycUseCase>("IGetWorkerKycUseCase", {
            useClass: GetWorkerKycUseCase
        })

        container.register<IUpdateWorkerKycStatusUseCase>("IUpdateWorkerKycStatusUseCase", {
            useClass: UpdateWorkerKycStatusUseCase
        })

        container.register<ICreateHubShipmentPickUpUsecase>("ICreateHubShipmentPickUpUsecase", {
            useClass: CreateHubShipmentPickUpUsecase
        })

        container.register<IGetShipmentsUsecase>("IGetShipmentsUsecase", {
            useClass: GetShipmentsUsecase
        })

        container.register<IGetShipmentDetailsUsecase>("IGetShipmentDetailsUsecase", {
            useClass: GetShipmentDetailsUsecase
        })

        container.register<IUpdateHubShipmentUsecase>("IUpdateHubShipmentUsecase", {
            useClass: UpdateHubShipmentUsecase
        })

        container.register<IGetWorkersShipmentUsecase>("IGetWorkersShipmentUsecase", {
            useClass: GetWorkersShipmentUsecase
        })

        container.register<IGetWorkerShipmentDetailsUsecase>("IGetWorkerShipmentDetailsUsecase", {
            useClass: GetWorkerShipmentDetailsUsecase
        })

        container.register<IUpdateShipmentStatusUsecase>("IUpdateShipmentStatusUsecase", {
            useClass: UpdateShipmentStatusUsecase
        })

        container.register<IGetAgencyTrackingUsecase>("IGetAgencyTrackingUsecase", {
            useClass: GetAgencyTrackingUsecase
        });

        container.register<IGetTravelerTrackingUsecase>("IGetTravelerTrackingUsecase", {
            useClass: GetTravelerTrackingUsecase
        })

        container.register<IBulkUpdateShipmentParcelUsecase>("IBulkUpdateShipmentParcelUsecase", {
            useClass: BulkUpdateShipmentParcelUsecase
        });

        container.register<ICreateHubShipmentOutForDeliveryUsecase>("ICreateHubShipmentOutForDeliveryUsecase", {
            useClass: CreateHubShipmentOutForDeliveryUsecase
        })

        container.register<IUpdateBookingStatusUsecase>("IUpdateBookingStatusUsecase", {
            useClass: UpdateBookingStatusUsecase
        });

        container.register<IGetTrackingUsecase>("IGetTrackingUsecase", {
            useClass: GetTrackingUsecase
        })

        container.register<IGetOrCreateChatUseCase>("IGetOrCreateChatUseCase", {
            useClass: GetOrCreateChatUseCase
        });

        container.register<IGetMessagesUsecase>("IGetMessagesUsecase", {
            useClass: GetMessagesUsecase
        });

        container.register<ISendMessageUseCase>("ISendMessageUseCase", {
            useClass: SendMessageUseCase
        });

        container.register<IGetWorkerParcelsUseCase>("IGetWorkerParcelsUseCase", {
            useClass: GetWorkerParcelsUseCase
        });

        container.register<IGetWorkerDashboardUseCase>("IGetWorkerDashboardUseCase", {
            useClass: GetWorkerDashboardUseCase
        });

        container.register<IGetWorkerGraphUseCase>("IGetWorkerGraphUseCase", {
            useClass: GetWorkerGraphUseCase
        });

        container.register<IGetHubProfileUseCase>("IGetHubProfileUseCase", {
            useClass: GetHubProfileUseCase
        });

        container.register<IEditHubProfileUseCase>("IEditHubProfileUseCase", {
            useClass: EditHubProfileUseCase
        });

        container.register<IResetHubPasswordUseCase>("IResetHubPasswordUseCase", {
            useClass: ResetHubPasswordUseCase
        });

        container.register<IGetHubDashboardSummaryUseCase>("IGetHubDashboardSummaryUseCase", {
            useClass: GetHubDashboardSummaryUseCase
        });

        container.register<IGetHubDashboardTrendUseCase>("IGetHubDashboardTrendUseCase", {
            useClass: GetHubDashboardTrendUseCase
        });

        container.register<IGetHubDashboardTypesUseCase>("IGetHubDashboardTypesUseCase", {
            useClass: GetHubDashboardTypesUseCase
        });

        container.register<IGetHubDashboardShipmentsPreviewUseCase>("IGetHubDashboardShipmentsPreviewUseCase", {
            useClass: GetHubDashboardShipmentsPreviewUseCase
        });

        container.register<IAgencyGetDashboardUsecase>("IAgencyGetDashboardUsecase", {
            useClass: AgencyGetDashboardUsecase
        });

        container.register<IAgencyGetSalesReportUseCase>("IAgencyGetSalesReportUseCase", {
            useClass: AgencyGetSalesReportUseCase
        });

        container.register<IAgencyGetSalesChartUseCase>("IAgencyGetSalesChartUseCase", {
            useClass: AgencyGetSalesChartUseCase
        });

        container.register<IAgencyGetDeliveriesChartUseCase>("IAgencyGetDeliveriesChartUseCase", {
            useClass: AgencyGetDeliveriesChartUseCase
        });

        container.register<IAgencyExportSalesReportUseCase>("IAgencyExportSalesReportUseCase", {
            useClass: AgencyExportSalesReportUseCase
        });

        container.register<INotificationRepository>("INotificationRepository", {
            useClass: NotificationRepository,
        });

        container.register<IGetNotificationsUseCase>("IGetNotificationsUseCase", {
            useClass: GetNotificationsUseCase,
        });

        container.register<IMarkAsReadUseCase>("IMarkAsReadUseCase", {
            useClass: MarkAsReadUseCase,
        });

        container.register<IMarkAllAsReadUseCase>("IMarkAllAsReadUseCase", {
            useClass: MarkAllAsReadUseCase,
        });

        container.register<IGetUnreadCountUseCase>("IGetUnreadCountUseCase", {
            useClass: GetUnreadCountUseCase,
        });

        container.register<IWorkerResendOtpUseCase>("IWorkerResendOtpUseCase", {
            useClass: WorkerResendOtpUseCase
        });

        container.register<IGoogleAuthUseCase>("IGoogleAuthUseCase", {
            useClass: GoogleAuthUseCase
        });

        container.register<IUpdateRouteGroupStatusUseCase>("IUpdateRouteGroupStatusUseCase", {
            useClass: UpdateRouteGroupStatusUseCase
        });

        container.register<IGetAdminDashboardOverviewUseCase>("IGetAdminDashboardOverviewUseCase", {
            useClass: GetAdminDashboardOverviewUseCase
        });

        container.register<IGetAdminRevenueChartUseCase>("IGetAdminRevenueChartUseCase", {
            useClass: GetAdminRevenueChartUseCase
        });

        container.register<IGetAdminBookingsChartUseCase>("IGetAdminBookingsChartUseCase", {
            useClass: GetAdminBookingsChartUseCase
        });

        container.register<IGetAdminBookingsReportUseCase>("IGetAdminBookingsReportUseCase", {
            useClass: GetAdminBookingsReportUseCase
        });

        container.register<IExportAdminBookingsReportUseCase>("IExportAdminBookingsReportUseCase", {
            useClass: ExportAdminBookingsReportUseCase
        });

        container.register<IGetWorkerProfileUseCase>("IGetWorkerProfileUseCase", {
            useClass: GetWorkerProfileUseCase
        });

        container.register<IEditWorkerProfileUseCase>("IEditWorkerProfileUseCase", {
            useClass: EditWorkerProfileUseCase
        });

        container.register<IResetWorkerPasswordUseCase>("IResetWorkerPasswordUseCase", {
            useClass: ResetWorkerPasswordUseCase
        });

        container.register<IResubmitHubUseCase>("IResubmitHubUseCase", {
            useClass: ResubmitHubUseCase
        })
    }
}