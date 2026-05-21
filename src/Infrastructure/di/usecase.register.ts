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
import { ICheckTempWorkerStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/ICheckTempWorkerStatusUseCase";
import { CheckTempWorkerStatusUseCase } from "../../Application/useCase/Worker/CheckTempWorkerStatus.usecase";
import { ICreateRouteGroupUseCase } from "../../Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/ICreateRouteGroupUseCase";
import { CreateRouteGroupUseCase } from "../../Application/useCase/Agency/RouteGroup/CreateRouteGroup.usecase";
import { IGetPaginatedRouteGroupUseCase } from "../../Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/IGetPaginatedRouteGroupUseCase";
import { GetPaginatedRouteGroupUseCase } from "../../Application/useCase/Agency/RouteGroup/GetPaginatedRouteGroup.usecase";
import { ICreateRouteSegmentUseCase } from "../../Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/ICreateRouteSegmentUseCase";
import { CreateRouteSegmentUseCase } from "../../Application/useCase/Agency/RouteGroup/CreateRouteSegment.usecase";
import { IGetRouteGroupDetailUseCase } from "../../Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/IGetRouteDetailsUsecase";
import { GetRouteGroupDetailUseCase } from "../../Application/useCase/Agency/RouteGroup/GetRouteGroupDetail.usecase";
import { ICreateParcelRouteUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/ParcelRoute/ICreateParcelRouteUsecase";
import { CreateParcelRouteUsecase } from "../../Application/useCase/Logistics/CreateParcelRoute.usecase";
import { ICreateHubShipmentsUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/ICreateHubShipmentsUsecase";
import { CreateHubShipmentsUsecase } from "../../Application/useCase/Logistics/CreateHubShipments.usecase";
import { IGetWorkerOverviewUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkerOverviewUseCase";
import { GetWorkerOverviewUseCase } from "../../Application/useCase/Worker/GetWorkerOverview.usecase";
import { IReSubmitWorkerKycUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IReSubmitWorkerKycUseCase";
import { ReSubmitWorkerKycUseCase } from "../../Application/useCase/Worker/ReSubmitWorkerKyc.usecase";
import { IGetWorkerKycUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkerKycUseCase";
import { GetWorkerKycUseCase } from "../../Application/useCase/Worker/GetWorkerKyc.usecase";
import { IUpdateWorkerKycStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IUpdateWorkerKycStatusUseCase";
import { UpdateWorkerKycStatusUseCase } from "../../Application/useCase/Worker/UpdateWorkerKycStatus.usecase";
import { ICreateHubShipmentPickUpUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/HubShipment/ICreateHubShipmentPickUpUsecase";
import { CreateHubShipmentPickUpUsecase } from "../../Application/useCase/Logistics/HubShipment/CreateHubShipmentPickUp.usecase";
import { IGetShipmentsUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IGetShipmentsUsecase";
import { GetShipmentsUsecase } from "../../Application/useCase/Logistics/HubShipment/GetShipments.usecase";
import { IGetShipmentDetailsUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IGetShipmentDetailsUsecase";
import { GetShipmentDetailsUsecase } from "../../Application/useCase/Logistics/ShipmentParcels/GetShipmentDetails.usecase";
import { IUpdateHubShipmentUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IUpdateHubShipmentUsecase";
import { UpdateHubShipmentUsecase } from "../../Application/useCase/Logistics/HubShipment/UpdateHubShipment.usecase";
import { IGetWorkersShipmentUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IGetWorkersShipmentUsecase";
import { GetWorkersShipmentUsecase } from "../../Application/useCase/Logistics/HubShipment/GetWorkersShipment.usecase";
import { IGetWorkerShipmentDetailsUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IGetWorkerShipmentDetailsUsecase";
import { GetWorkerShipmentDetailsUsecase } from "../../Application/useCase/Logistics/ShipmentParcels/GetWorkerShipmentDetails.usecase";
import { IUpdateShipmentStatusUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IUpdateShipmentStatusUsecase";
import { UpdateShipmentStatusUsecase } from "../../Application/useCase/Logistics/ShipmentParcels/UpdateShipmentStatus.usecase";
import { IGetAgencyTrackingUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/Tracking/IGetAgencyTrackingUsecase";
import { GetAgencyTrackingUsecase } from "../../Application/useCase/Logistics/Tracking/GetAgencyTracking.usecase";
import { IBulkUpdateShipmentParcelUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IBulkUpdateShipmentParcelUsecase";
import { BulkUpdateShipmentParcelUsecase } from "../../Application/useCase/Logistics/ShipmentParcels/BulkUpdateShipmentParcel.usecase";
import { ICreateHubShipmentOutForDeliveryUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/HubShipment/ICreateHubShipmentOutForDeliveryUsecase";
import { CreateHubShipmentOutForDeliveryUsecase } from "../../Application/useCase/Logistics/HubShipment/CreateHubShipmentOutForDelivery.usecase";
import { IUpdateBookingStatusUsecase } from "../../Application/interfaces/useCase_Interfaces/user/Booking/IUpdateBookingStatusUsecase";
import { UpdateBookingStatusUsecase } from "../../Application/useCase/User/Booking/UpdateBookingStatus.usecase";
import { GetTravelerTrackingUsecase } from "../../Application/useCase/Logistics/Tracking/GetTravelerTracking.usecase";
import { IGetTravelerTrackingUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/Tracking/IGetTravelerTrackingUsecase";
import { IGetTrackingUsecase } from "../../Application/interfaces/useCase_Interfaces/Logistics/Tracking/IGetTrackingUsecase";
import { GetTrackingUsecase } from "../../Application/useCase/Logistics/Tracking/GetTracking.usecase";
import { IGetOrCreateChatUseCase } from "../../Application/interfaces/useCase_Interfaces/Chat/IGetOrCreateChatUseCase";
import { GetOrCreateChatUseCase } from "../../Application/useCase/Chat/GetOrCreateChat.usecase";
import { IGetMessagesUsecase } from "../../Application/interfaces/useCase_Interfaces/Chat/IGetMessagesUsecase";
import { GetMessagesUsecase } from "../../Application/useCase/Chat/GetMessages.usecase";
import { ISendMessageUseCase } from "../../Application/interfaces/useCase_Interfaces/Chat/ISendMessageUseCase";
import { SendMessageUseCase } from "../../Application/useCase/Chat/SendMessage.usecase";
import { IGetWorkerParcelsUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkerParcelsUseCase";
import { GetWorkerParcelsUseCase } from "../../Application/useCase/Worker/GetWorkerParcels.usecase";
import { IGetWorkerDashboardUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkerDashboardUseCase";
import { GetWorkerDashboardUseCase } from "../../Application/useCase/Worker/GetWorkerDashboard.usecase";
import { IGetWorkerGraphUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkerGraphUseCase";
import { GetWorkerGraphUseCase } from "../../Application/useCase/Worker/GetWorkerGraph.usecase";
import { IGetHubProfileUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IGetHubProfileUseCase";
import { GetHubProfileUseCase } from "../../Application/useCase/Hub/GetHubProfile.usecase";
import { IEditHubProfileUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IEditHubProfileUseCase";
import { EditHubProfileUseCase } from "../../Application/useCase/Hub/EditHubProfile.usecase";
import { IResetHubPasswordUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IResetHubPasswordUseCase";
import { ResetHubPasswordUseCase } from "../../Application/useCase/Hub/ResetHubPassword.usecase";
import { IGetHubDashboardSummaryUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardSummaryUseCase";
import { GetHubDashboardSummaryUseCase } from "../../Application/useCase/Hub/GetHubDashboardSummary.usecase";
import { GetHubDashboardTrendUseCase } from "../../Application/useCase/Hub/GetHubDashboardTrend.usecase";
import { IGetHubDashboardTrendUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardTrendUseCase";
import { GetHubDashboardTypesUseCase } from "../../Application/useCase/Hub/GetHubDashboardTypes.usecase";
import { IGetHubDashboardTypesUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardTypesUseCase";
import { IGetHubDashboardShipmentsPreviewUseCase } from "../../Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardShipmentsPreviewUseCase";
import { GetHubDashboardShipmentsPreviewUseCase } from "../../Application/useCase/Hub/GetHubDashboardShipmentsPreview.usecase";
import { IAgencyGetDashboardUsecase } from "../../Application/interfaces/useCase_Interfaces/Agency/IAgencyGetDashboardUseCase";
import { AgencyGetDashboardUsecase } from "../../Application/useCase/Agency/AgencyGetDashboard.usecase";
import { IAgencyGetSalesReportUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/IAgencyGetSalesReportUseCase";
import { AgencyGetSalesReportUseCase } from "../../Application/useCase/Agency/AgencyGetSalesReport.usecase";
import { IAgencyGetSalesChartUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/IAgencyGetSalesChartUseCase";
import { AgencyGetSalesChartUseCase } from "../../Application/useCase/Agency/AgencyGetSalesChart.usecase";
import { IAgencyGetDeliveriesChartUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/IAgencyGetDeliveriesChartUseCase";
import { AgencyGetDeliveriesChartUseCase } from "../../Application/useCase/Agency/AgencyGetDeliveriesChart.usecase";
import { IAgencyExportSalesReportUseCase } from "../../Application/interfaces/useCase_Interfaces/Agency/IAgencyExportSalesReportUsecase";
import { AgencyExportSalesReportUseCase } from "../../Application/useCase/Agency/AgencyExportSalesReport.usecase";
import { INotificationRepository } from "../../Application/interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { NotificationRepository } from "../repositories/Notification/Notification.repository";
import { IGetNotificationsUseCase } from "../../Application/interfaces/useCase_Interfaces/Notification/IGetNotificationsUseCase";
import { GetNotificationsUseCase } from "../../Application/useCase/Notification/GetNotifications.usecase";
import { IMarkAsReadUseCase } from "../../Application/interfaces/useCase_Interfaces/Notification/IMarkAsReadUseCase";
import { MarkAsReadUseCase } from "../../Application/useCase/Notification/MarkAsRead.usecase";
import { IMarkAllAsReadUseCase } from "../../Application/interfaces/useCase_Interfaces/Notification/IMarkAllAsReadUseCase";
import { MarkAllAsReadUseCase } from "../../Application/useCase/Notification/MarkAllAsRead.usecase";
import { GetUnreadCountUseCase } from "../../Application/useCase/Notification/GetUnreadCount.usecase";
import { IGetUnreadCountUseCase } from "../../Application/interfaces/useCase_Interfaces/Notification/IGetUnreadCountUseCase";
import { IWorkerResendOtpUseCase } from "../../Application/interfaces/useCase_Interfaces/Worker/IWorkerResendOtpUseCase";
import { WorkerResendOtpUseCase } from "../../Application/useCase/Worker/WorkerResendOtp.usecase";
import { IGoogleAuthUseCase } from "../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/IGoogleAuthUseCase";
import { GoogleAuthUseCase } from "../../Application/useCase/Auth/GoogleAuthUseCase";
import { IUpdateRouteGroupStatusUseCase } from "../../Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/IUpdateRouteGroupStatusUseCase";
import { UpdateRouteGroupStatusUseCase } from "../../Application/useCase/Agency/RouteGroup/UpdateRouteGroupStatus.usecase";
import { IGetAdminDashboardOverviewUseCase } from "../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminDashboardOverviewUseCase";
import { GetAdminDashboardOverviewUseCase } from "../../Application/useCase/Admin/GetAdminDashboardOverview.usecase";
import { IGetAdminRevenueChartUseCase } from "../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminRevenueChartUseCase";
import { GetAdminRevenueChartUseCase } from "../../Application/useCase/Admin/GetAdminRevenueChart.usecase";
import { IGetAdminBookingsChartUseCase } from "../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminBookingsChartUseCase";
import { GetAdminBookingsChartUseCase } from "../../Application/useCase/Admin/GetAdminBookingsChart.usecase";
import { IGetAdminBookingsReportUseCase } from "../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminBookingsReportUseCase";
import { GetAdminBookingsReportUseCase } from "../../Application/useCase/Admin/GetAdminBookingsReport.usecase";
import { IExportAdminBookingsReportUseCase } from "../../Application/interfaces/useCase_Interfaces/Admin/IExportAdminBookingsReportUseCase";
import { ExportAdminBookingsReportUseCase } from "../../Application/useCase/Admin/ExportAdminBookingsReport.usecase";



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
        })
    }
}