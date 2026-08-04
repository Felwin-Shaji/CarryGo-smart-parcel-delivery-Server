import { container } from "tsyringe";
import { SendOtpUseCase } from "../../Application/UseCases/Auth/SendOtpUseCase";
import { VerifyOtpUseCase } from "../../Application/UseCases/Auth/VerifyOtpUseCase";
import { GenerateTokenUseCase } from "../../Application/UseCases/Auth/GenerateTokenUseCase";
import { RegisterUserUseCase } from "../../Application/UseCases/User/RegisterUserUseCase";
import { RefreshTokenUseCase } from "../../Application/UseCases/Auth/RefreshTokenUseCase";
import { LoginUsecase } from "../../Application/UseCases/Auth/LoginUseCase";
import type { ILogoutUsecase } from "../../Application/Interfaces/UseCases/Auth/ILogoutUseCase";
import type { IRegisterUserUseCase } from "../../Application/Interfaces/UseCases/User/IRegisterUserUseCase";
import type { IRegisterAgencyUseCase } from "../../Application/Interfaces/UseCases/Agency/IRegisterAgencyUseCase";
import { RegisterAgencyUseCase } from "../../Application/UseCases/Agency/RegisterAgencyUseCase";
import { IUploadAgencyKycFilesUseCase } from "../../Application/Interfaces/UseCases/Agency/IUploadAgencyKycFilesUseCase";
import { UploadAgencyKycFilesUseCase } from "../../Application/UseCases/Agency/UploadAgencyKycFilesUseCase";
import { ISaveAgencyKycUseCase } from "../../Application/Interfaces/UseCases/Agency/ISaveAgencyKycUseCase";
import { SaveAgencyKycUseCase } from "../../Application/UseCases/Agency/SaveAgencyKycUseCase";
import { IUpdateAgencyKycStatusUseCase } from "../../Application/Interfaces/UseCases/Agency/IUpdateAgencyKycStatusUseCase";
import { IGetAgenciesUseCase } from "../../Application/Interfaces/UseCases/Agency/IGetAgenciesUseCase";
import { GetAgenciesUseCase } from "../../Application/UseCases/Agency/GetAgenciesUseCase";
import { IGetUsersUseCase } from "../../Application/Interfaces/UseCases/User/IGetUsersUseCase";
import { GetUsersUseCase } from "../../Application/UseCases/User/GetUsersUseCase";
import { IGetAgencyWithKYCUseCase } from "../../Application/Interfaces/UseCases/Agency/IGetAgencyWithKYCUseCase";
import { GetAgencyWithKYCUseCase } from "../../Application/UseCases/Agency/GetAgencyWithKYCUseCase";
import { ResendOtpUseCase } from "../../Application/UseCases/Auth/ResendOtpUseCase";
import { IResendOtpUseCase } from "../../Application/Interfaces/UseCases/Auth/IResendOtpUseCase";
import { ISendOtpUseCase } from "../../Application/Interfaces/UseCases/Auth/ISendOtpUseCase";
import { IVerifyOtpUseCase } from "../../Application/Interfaces/UseCases/Auth/IVerifyOtpUseCase";
import { IGenerateTokenUseCase } from "../../Application/Interfaces/UseCases/Auth/IGenerateTokenUseCase";
import { IRefreshTokenUseCase } from "../../Application/Interfaces/UseCases/Auth/IRefreshTokenUseCase";
import { ILoginUsecase } from "../../Application/Interfaces/UseCases/Auth/ILoginUseCase";
import { LogoutUsecase } from "../../Application/UseCases/Auth/LogoutUseCase";
import { UpdateAgencyKycStatusUseCase } from "../../Application/UseCases/Agency/UpdateAgencyKycStatusUseCase";
import { IAddHubUseCase } from "../../Application/Interfaces/UseCases/Hub/IAddHubUseCase";
import { AddHubUseCase } from "../../Application/UseCases/Hub/AddHubUseCase";
import { IUploadAddFilesUseCase } from "../../Application/Interfaces/UseCases/Hub/IUploadAddFilesUseCase";
import { UploadAddFilesUseCase } from "../../Application/UseCases/Hub/UploadAddFilesUseCase";
import { IAddHubTempUseCase } from "../../Application/Interfaces/UseCases/Hub/IAddHubTempUseCase";
import { AddHubTempUseCase } from "../../Application/UseCases/Hub/AddHubTempUseCase";
import { IAddNewHubResendOtp } from "../../Application/Interfaces/UseCases/Hub/IAddNewHubResendOtpUseCase";
import { AddNewHubResendOtp } from "../../Application/UseCases/Hub/AddNewHubResendOtpUseCase";
import { IAddNewHubVerifyOtpUseCase } from "../../Application/Interfaces/UseCases/Hub/IAddNewHubVerifyOtpUseCase";
import { AddNewHubVerifyOtpUseCase } from "../../Application/UseCases/Hub/AddNewHubVerifyOtpUseCase";
import { ICheckTempHubStatusUseCase } from "../../Application/Interfaces/UseCases/Hub/ICheckTempHubStatusUseCase";
import { CheckTempHubStatusUseCase } from "../../Application/UseCases/Hub/CheckTempHubStatusUseCase";
import { IVarifyEmailUseCase } from "../../Application/Interfaces/UseCases/Auth/IVerifyEmailUseCase";
import { VarifyEmailUseCase } from "../../Application/UseCases/Auth/VerifyEmailUseCase";
import { IResetPasswordUseCase } from "../../Application/Interfaces/UseCases/Auth/IResetPasswordUseCase";
import { ResetPasswordUseCase } from "../../Application/UseCases/Auth/ResetPasswordUseCase";
import { IUpdateUserStatusUseCase } from "../../Application/Interfaces/UseCases/User/IUpdateUserStatusUseCase";
import { UpdateUserStatusUseCase } from "../../Application/UseCases/User/UpdateUserStatusUseCase";
import { IUpdateAgencyStatusUseCase } from "../../Application/Interfaces/UseCases/Agency/IUpdateAgencyStatusUseCase";
import { UpdateAgencyStatusUseCase } from "../../Application/UseCases/Agency/UpdateAgencyStatusUseCase";
import { IAddWorkerTempUseCase } from "../../Application/Interfaces/UseCases/Worker/IAddWorkerTempUseCase";
import { AddWorkerTempUseCase } from "../../Application/UseCases/Worker/AddWorkerTempUseCase";
import { IWorkerVerifyOtpUseCase } from "../../Application/Interfaces/UseCases/Worker/IWorkerVerifyOtpUseCase";
import { WorkerVerifyOtpUseCase } from "../../Application/UseCases/Worker/WorkerVerifyOtpUseCase";
import { IRsubmitAgencyKycUseCase } from "../../Application/Interfaces/UseCases/Agency/IResubmitAgencyKycUseCase";
import { RsubmitAgencyKycUseCase } from "../../Application/UseCases/Agency/ResubmitAgencyKycUseCase";
import { IUploadWorkerKycFilesUsecase } from "../../Application/Interfaces/UseCases/Worker/IUploadWorkerKycFilesUseCase";
import { UploadWorkerKycFilesUsecase } from "../../Application/UseCases/Worker/UploadWorkerKycFilesUseCase";
import { IAddWorkerUsecase } from "../../Application/Interfaces/UseCases/Worker/IAddWorkerUseCase";
import { AddWorkerUsecase } from "../../Application/UseCases/Worker/AddWorkerUseCase";
import { IGetHubsUsecase } from "../../Application/Interfaces/UseCases/Hub/IGetHubsUseCase";
import { GetHubsUsecase } from "../../Application/UseCases/Hub/GetHubsUseCase";
import { IGetUserProfileUseCase } from "../../Application/Interfaces/UseCases/User/IGetUserProfileUseCase";
import { GetUserProfileUseCase } from "../../Application/UseCases/User/GetUserProfileUseCase";
import { IEditUserProfileUseCase } from "../../Application/Interfaces/UseCases/User/IEditUserProfileUseCase";
import { EditUserProfileUseCase } from "../../Application/UseCases/User/EditUserProfileUseCase";
import { IUserReserUserPassword } from "../../Application/Interfaces/UseCases/User/IResetUserPasswordUseCase";
import { UserReserUserPassword } from "../../Application/UseCases/User/ResetUserPasswordUseCase";
import { IGetAgencyOverviewUseCase } from "../../Application/Interfaces/UseCases/Agency/IGetAgencyOverviewUseCase";
import { GetAgencyOverviewUseCase } from "../../Application/UseCases/Agency/GetAgencyOverviewUseCase";
import { IGetPricingUseCase } from "../../Application/Interfaces/UseCases/Pricing/IGetPricingUseCase";
import { GetPricingUseCase } from "../../Application/UseCases/Pricing/GetPricingUseCase";
import { GetAgencyPricingUsecase } from "../../Application/UseCases/Pricing/GetAgencyPricingUseCase";
import { IGetAgencyPricingUsecase } from "../../Application/Interfaces/UseCases/Pricing/IGetAgencyPricingUseCase";
import { IUpsertAgencyPricingUseCase } from "../../Application/Interfaces/UseCases/Pricing/IUpsertAgencyPricingUseCase";
import { UpsertAgencyPricingUseCase } from "../../Application/UseCases/Pricing/UpsertAgencyPricingUseCase";
import { CreateAdminPricingPolicyUseCase } from "../../Application/UseCases/Pricing/CreateAdminPricingPolicyUseCase";
import { ICreateAdminPricingPolicyUseCase } from "../../Application/Interfaces/UseCases/Pricing/ICreateAdminPricingPolicyUseCase";
import { IGetAdminProfileUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminProfileUseCase";
import { GetAdminProfileUseCase } from "../../Application/UseCases/Admin/GetAdminProfileUseCase";
import { EditAdminProfileUseCase } from "../../Application/UseCases/Admin/EditAdminProfileUseCase";
import { IEditAdminProfileUseCase } from "../../Application/Interfaces/UseCases/Admin/IEditAdminProfileUseCase";
import { ResetAdminPasswordUseCase } from "../../Application/UseCases/Admin/ResetAdminPasswordUseCase";
import { IResetAdminPasswordUsecase } from "../../Application/Interfaces/UseCases/Admin/IResetAdminPasswordUseCase";
import { GetAgencyProfileUseCase } from "../../Application/UseCases/Agency/GetAgencyProfileUseCase";
import { IGetAgencyProfileUseCase } from "../../Application/Interfaces/UseCases/Agency/IGetAgencyProfileUseCase";
import { EditAgencyProfileUseCase } from "../../Application/UseCases/Agency/EditAgencyProfileUseCase";
import { IEditAgencyProfileUseCase } from "../../Application/Interfaces/UseCases/Agency/IEditAgencyProfileUseCase";
import { ResetAgencyPasswordUseCase } from "../../Application/UseCases/Agency/ResetAgencyPasswordUseCase";
import { IResetAgencyPasswordUseCase } from "../../Application/Interfaces/UseCases/Agency/IResetAgencyPasswordUseCase";
import { ICreateAddressFromLocationUseCase } from "../../Application/Interfaces/UseCases/User/Address/ICreateAddressFromLocationUseCase";
import { CreateAddressFromLocationUseCase } from "../../Application/UseCases/User/Address/CreateAddressFromLocationUseCase";
import { AddUserAddressUseCase } from "../../Application/UseCases/User/Address/AddUserAddressUseCase";
import { IAddUserAddressUseCase } from "../../Application/Interfaces/UseCases/User/Address/IAddUserAddressUseCase";
import { IGetUserAddressesUseCase } from "../../Application/Interfaces/UseCases/User/Address/IGetUserAddressesUseCase";
import { GetUserAddressesUseCase } from "../../Application/UseCases/User/Address/GetUserAddressesUseCase";
import { IDeleteUserAddressUseCase } from "../../Application/Interfaces/UseCases/User/Address/IDeleteUserAddressUseCase";
import { DeleteUserAddressUseCase } from "../../Application/UseCases/User/Address/DeleteUserAddressUseCase";
import { ISetDefaultUserAddressUseCase } from "../../Application/Interfaces/UseCases/User/Address/ISetDefaultUserAddressUseCase";
import { SetDefaultUserAddressUseCase } from "../../Application/UseCases/User/Address/SetDefaultUserAddressUseCase";
import { IFindServicableAgencyUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IFindServicableAgencyUseCase";
import { FindServicableAgencyUsecase } from "../../Application/UseCases/User/Booking/FindServicableAgencyUseCase";
import { IGetWorkersUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkersUseCase";
import { GetWorkersUseCase } from "../../Application/UseCases/Worker/GetWorkersUseCase";
import { IGetHubUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubUseCase";
import { GetHubUseCase } from "../../Application/UseCases/Hub/GetHubUseCase";
import { IGetHubOverviewUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubOverviewUseCase";
import { GetHubOverviewUseCase } from "../../Application/UseCases/Hub/GetHubOverviewUseCase";
import { IUpdateHubKycStatusUseCase } from "../../Application/Interfaces/UseCases/Hub/IUpdateHubKycStatusUseCase";
import { UpdateHubKycStatusUseCase } from "../../Application/UseCases/Hub/UpdateHubKycStatusUseCase";
import { ICalculateBookingPriceUsecase } from "../../Application/Interfaces/UseCases/User/Booking/ICalculateBookingPriceUseCase";
import { ICreateBookingUsecase } from "../../Application/Interfaces/UseCases/User/Booking/ICreateBookingUseCase";
import { CreateBookingUsecase } from "../../Application/UseCases/User/Booking/CreateBookingUseCase";
import { ICreatePaymentOrderUsecase } from "../../Application/Interfaces/UseCases/Payment/ICreatePaymentOrderUseCase";
import { CreatePaymentOrderUsecase } from "../../Application/UseCases/Payment/CreatePaymentOrderUseCase";
import { IValidateSessionUseCase } from "../../Application/Interfaces/UseCases/Auth/IValidateSessionUseCase";
import { ValidateSessionUseCase } from "../../Application/UseCases/Auth/ValidateSessionUseCase";
import { IGetWalletOverviewUseCase } from "../../Application/Interfaces/UseCases/Wallet/IGetWalletOverviewUseCase";
import { GetWalletOverviewUseCase } from "../../Application/UseCases/Wallet/GetWalletOverviewUseCase";
import { IGetWalletUseCase } from "../../Application/Interfaces/UseCases/Wallet/IGetWalletUseCase";
import { GetWalletUseCase } from "../../Application/UseCases/Wallet/GetWalletUseCase";
import { IWalletTopupSuccessUseCase } from "../../Application/Interfaces/UseCases/Wallet/IWalletTopupSuccessUseCase";
import { WalletTopupSuccessUseCase } from "../../Application/UseCases/Wallet/WalletTopupSuccessUseCase";
import { ICreateWalletTopupOrderUseCase } from "../../Application/Interfaces/UseCases/Wallet/ICreateWalletTopupOrderUseCase";
import { CreateWalletTopupOrderUseCase } from "../../Application/UseCases/Wallet/CreateWalletTopupOrderUseCase";
import { IGetBookingUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IGetBookingUseCase";
import { GetBookingUsecase } from "../../Application/UseCases/User/Booking/GetBookingUseCase";
import { IBookingPaymentSuccessUseCase } from "../../Application/Interfaces/UseCases/Payment/IBookingPaymentSuccessUseCase";
import { BookingPaymentSuccessUseCase } from "../../Application/UseCases/Payment/BookingPaymentSuccessUseCase";
import { IUserBookingsUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IUserBookingsUseCase";
import { UserBookingsUsecase } from "../../Application/UseCases/User/Booking/UserBookingsUseCase";
import { ISubmitTravelerKycUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/ISubmitTravelerKycUseCase";
import { SubmitTravelerKycUseCase } from "../../Application/UseCases/User/Traveler/SubmitTravelerKycUseCase";
import { IUpdateUserKycStatusUseCase } from "../../Application/Interfaces/UseCases/User/IUpdateUserKycStatusUseCase";
import { UpdateUserKycStatusUseCase } from "../../Application/UseCases/User/Traveler/UpdateUserKycStatusUseCase";
import { GetUserOverviewUseCase } from "../../Application/UseCases/User/GetUserOverviewUseCase";
import { IGetUserOverviewUseCase } from "../../Application/Interfaces/UseCases/User/IGetUserOverviewUseCase";
import { IGetTravelerKycUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/IGetTravelerKycUseCase";
import { GetTravelerKycUseCase } from "../../Application/UseCases/User/Traveler/GetTravelerKycUseCase";
import { IReSubmitTravelerKycUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/IReSubmitTravelerKycUseCase";
import { ReSubmitTravelerKycUseCase } from "../../Application/UseCases/User/Traveler/ReSubmitTravelerKycUseCase";
import { ICreateTravelRequestUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/ICreateTravelRequestUseCase";
import { CreateTravelRequestUseCase } from "../../Application/UseCases/User/Traveler/CreateTravelRequestUseCase";
import { IGetTravelRequestsUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/IGetTravelRequestsUseCase";
import { GetTravelRequestsUseCase } from "../../Application/UseCases/User/Traveler/GetTravelRequestsUseCase";
import { GetTravelerTripOverviewUseCase } from "../../Application/UseCases/User/Traveler/GetTravelerTripOverviewUseCase";
import { IGetTravelerTripOverviewUseCase } from "../../Application/Interfaces/UseCases/User/Traveler/IGetTravelerTripOverviewUseCase";
import { CalculateBookingPriceUsecase } from "../../Application/UseCases/User/Booking/CalculatePricing/CalculateBookingPriceUseCase";
import { ICalculatePriceUsecase } from "../../Application/Interfaces/UseCases/User/Booking/CalculatePricing/ICalculatePrice";
import { CalculateAgencyPriceUsecase } from "../../Application/UseCases/User/Booking/CalculatePricing/CalculateAgencyPriceUseCase";
import { TravelerPricingUsecase } from "../../Application/UseCases/User/Booking/CalculatePricing/CalculateTravelerPriceUseCase";
import { ICreateAdminTravelerPricingUsecase } from "../../Application/Interfaces/UseCases/Pricing/ICreateAdminTravelerPricingUseCase";
import { CreateAdminTravelerPricingUsecase } from "../../Application/UseCases/Pricing/CreateAdminTravelerPricingUseCase";
import { IFindServiceableTravelerUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IFindServiceableTravelerUseCase";
import { FindServiceableTravelerUsecase } from "../../Application/UseCases/User/Booking/FindServiceableTravelerUseCase";
import { IWithdrawWalletMoneyUseCase } from "../../Application/Interfaces/UseCases/Wallet/IWithdrawWalletMoneyUseCase";
import { WithdrawWalletMoneyUseCase } from "../../Application/UseCases/Wallet/WithdrawWalletMoneyUseCase";
import { IBookingPaymentFailedUseCase } from "../../Application/Interfaces/UseCases/Payment/IBookingPaymentFailedUseCase";
import { BookingPaymentFailedUseCase } from "../../Application/UseCases/Payment/BookingPaymentFailedUseCase";
import { ICheckTempWorkerStatusUseCase } from "../../Application/Interfaces/UseCases/Worker/ICheckTempWorkerStatusUseCase";
import { CheckTempWorkerStatusUseCase } from "../../Application/UseCases/Worker/CheckTempWorkerStatusUseCase";
import { ICreateRouteGroupUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/ICreateRouteGroupUseCase";
import { CreateRouteGroupUseCase } from "../../Application/UseCases/Agency/RouteGroup/CreateRouteGroupUseCase";
import { IGetPaginatedRouteGroupUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/IGetPaginatedRouteGroupUseCase";
import { GetPaginatedRouteGroupUseCase } from "../../Application/UseCases/Agency/RouteGroup/GetPaginatedRouteGroupUseCase";
import { ICreateRouteSegmentUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/ICreateRouteSegmentUseCase";
import { CreateRouteSegmentUseCase } from "../../Application/UseCases/Agency/RouteGroup/CreateRouteSegmentUseCase";
import { IGetRouteGroupDetailUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/IGetRouteDetailsUseCase";
import { GetRouteGroupDetailUseCase } from "../../Application/UseCases/Agency/RouteGroup/GetRouteGroupDetailUseCase";
import { ICreateParcelRouteUsecase } from "../../Application/Interfaces/UseCases/Logistics/ParcelRoute/ICreateParcelRouteUseCase";
import { CreateParcelRouteUsecase } from "../../Application/UseCases/Logistics/CreateParcelRouteUseCase";
import { ICreateHubShipmentsUsecase } from "../../Application/Interfaces/UseCases/Logistics/ICreateHubShipmentsUseCase";
import { CreateHubShipmentsUsecase } from "../../Application/UseCases/Logistics/CreateHubShipmentsUseCase";
import { IGetWorkerOverviewUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerOverviewUseCase";
import { GetWorkerOverviewUseCase } from "../../Application/UseCases/Worker/GetWorkerOverviewUseCase";
import { IReSubmitWorkerKycUseCase } from "../../Application/Interfaces/UseCases/Worker/IReSubmitWorkerKycUseCase";
import { ReSubmitWorkerKycUseCase } from "../../Application/UseCases/Worker/ReSubmitWorkerKycUseCase";
import { IGetWorkerKycUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerKycUseCase";
import { GetWorkerKycUseCase } from "../../Application/UseCases/Worker/GetWorkerKycUseCase";
import { IUpdateWorkerKycStatusUseCase } from "../../Application/Interfaces/UseCases/Worker/IUpdateWorkerKycStatusUseCase";
import { UpdateWorkerKycStatusUseCase } from "../../Application/UseCases/Worker/UpdateWorkerKycStatusUseCase";
import { ICreateHubShipmentPickUpUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/ICreateHubShipmentPickUpUseCase";
import { CreateHubShipmentPickUpUsecase } from "../../Application/UseCases/Logistics/HubShipment/CreateHubShipmentPickUpUseCase";
import { IGetShipmentsUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/IGetShipmentsUseCase";
import { GetShipmentsUsecase } from "../../Application/UseCases/Logistics/HubShipment/GetShipmentsUseCase";
import { IGetShipmentDetailsUsecase } from "../../Application/Interfaces/UseCases/Logistics/ShipmentParcel/IGetShipmentDetailsUseCase";
import { GetShipmentDetailsUsecase } from "../../Application/UseCases/Logistics/ShipmentParcel/GetShipmentDetailsUseCase";
import { IUpdateHubShipmentUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/IUpdateHubShipmentUseCase";
import { UpdateHubShipmentUsecase } from "../../Application/UseCases/Logistics/HubShipment/UpdateHubShipmentUseCase";
import { IGetWorkersShipmentUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/IGetWorkersShipmentUseCase";
import { GetWorkersShipmentUsecase } from "../../Application/UseCases/Logistics/HubShipment/GetWorkersShipmentUseCase";
import { IGetWorkerShipmentDetailsUsecase } from "../../Application/Interfaces/UseCases/Logistics/ShipmentParcel/IGetWorkerShipmentDetailsUseCase";
import { GetWorkerShipmentDetailsUsecase } from "../../Application/UseCases/Logistics/ShipmentParcel/GetWorkerShipmentDetailsUseCase";
import { IUpdateShipmentStatusUsecase } from "../../Application/Interfaces/UseCases/Logistics/ShipmentParcel/IUpdateShipmentStatusUseCase";
import { UpdateShipmentStatusUsecase } from "../../Application/UseCases/Logistics/ShipmentParcel/UpdateShipmentStatusUseCase";
import { IGetAgencyTrackingUsecase } from "../../Application/Interfaces/UseCases/Logistics/Tracking/IGetAgencyTrackingUseCase";
import { GetAgencyTrackingUsecase } from "../../Application/UseCases/Logistics/Tracking/GetAgencyTrackingUseCase";
import { IBulkUpdateShipmentParcelUsecase } from "../../Application/Interfaces/UseCases/Logistics/ShipmentParcel/IBulkUpdateShipmentParcelUseCase";
import { BulkUpdateShipmentParcelUsecase } from "../../Application/UseCases/Logistics/ShipmentParcel/BulkUpdateShipmentParcelUseCase";
import { ICreateHubShipmentOutForDeliveryUsecase } from "../../Application/Interfaces/UseCases/Logistics/HubShipment/ICreateHubShipmentOutForDeliveryUseCase";
import { CreateHubShipmentOutForDeliveryUsecase } from "../../Application/UseCases/Logistics/HubShipment/CreateHubShipmentOutForDeliveryUseCase";
import { IUpdateBookingStatusUsecase } from "../../Application/Interfaces/UseCases/User/Booking/IUpdateBookingStatusUseCase";
import { UpdateBookingStatusUsecase } from "../../Application/UseCases/User/Booking/UpdateBookingStatusUseCase";
import { GetTravelerTrackingUsecase } from "../../Application/UseCases/Logistics/Tracking/GetTravelerTrackingUseCase";
import { IGetTravelerTrackingUsecase } from "../../Application/Interfaces/UseCases/Logistics/Tracking/IGetTravelerTrackingUseCase";
import { IGetTrackingUsecase } from "../../Application/Interfaces/UseCases/Logistics/Tracking/IGetTrackingUseCase";
import { GetTrackingUsecase } from "../../Application/UseCases/Logistics/Tracking/GetTrackingUseCase";
import { IGetOrCreateChatUseCase } from "../../Application/Interfaces/UseCases/Chat/IGetOrCreateChatUseCase";
import { GetOrCreateChatUseCase } from "../../Application/UseCases/Chat/GetOrCreateChatUseCase";
import { IGetMessagesUsecase } from "../../Application/Interfaces/UseCases/Chat/IGetMessagesUseCase";
import { GetMessagesUsecase } from "../../Application/UseCases/Chat/GetMessagesUseCase";
import { ISendMessageUseCase } from "../../Application/Interfaces/UseCases/Chat/ISendMessageUseCase";
import { SendMessageUseCase } from "../../Application/UseCases/Chat/SendMessageUseCase";
import { IGetWorkerParcelsUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerParcelsUseCase";
import { GetWorkerParcelsUseCase } from "../../Application/UseCases/Worker/GetWorkerParcelsUseCase";
import { IGetWorkerDashboardUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerDashboardUseCase";
import { GetWorkerDashboardUseCase } from "../../Application/UseCases/Worker/GetWorkerDashboardUseCase";
import { IGetWorkerGraphUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerGraphUseCase";
import { GetWorkerGraphUseCase } from "../../Application/UseCases/Worker/GetWorkerGraphUseCase";
import { IGetHubProfileUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubProfileUseCase";
import { GetHubProfileUseCase } from "../../Application/UseCases/Hub/GetHubProfileUseCase";
import { IEditHubProfileUseCase } from "../../Application/Interfaces/UseCases/Hub/IEditHubProfileUseCase";
import { EditHubProfileUseCase } from "../../Application/UseCases/Hub/EditHubProfileUseCase";
import { IResetHubPasswordUseCase } from "../../Application/Interfaces/UseCases/Hub/IResetHubPasswordUseCase";
import { ResetHubPasswordUseCase } from "../../Application/UseCases/Hub/ResetHubPasswordUseCase";
import { IGetHubDashboardSummaryUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubDashboardSummaryUseCase";
import { GetHubDashboardSummaryUseCase } from "../../Application/UseCases/Hub/GetHubDashboardSummaryUseCase";
import { GetHubDashboardTrendUseCase } from "../../Application/UseCases/Hub/GetHubDashboardTrendUseCase";
import { IGetHubDashboardTrendUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubDashboardTrendUseCase";
import { GetHubDashboardTypesUseCase } from "../../Application/UseCases/Hub/GetHubDashboardTypesUseCase";
import { IGetHubDashboardTypesUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubDashboardTypesUseCase";
import { IGetHubDashboardShipmentsPreviewUseCase } from "../../Application/Interfaces/UseCases/Hub/IGetHubDashboardShipmentsPreviewUseCase";
import { GetHubDashboardShipmentsPreviewUseCase } from "../../Application/UseCases/Hub/GetHubDashboardShipmentsPreviewUseCase";
import { IAgencyGetDashboardUsecase } from "../../Application/Interfaces/UseCases/Agency/IAgencyGetDashboardUseCase";
import { AgencyGetDashboardUsecase } from "../../Application/UseCases/Agency/AgencyGetDashboardUseCase";
import { IAgencyGetSalesReportUseCase } from "../../Application/Interfaces/UseCases/Agency/IAgencyGetSalesReportUseCase";
import { AgencyGetSalesReportUseCase } from "../../Application/UseCases/Agency/AgencyGetSalesReportUseCase";
import { IAgencyGetSalesChartUseCase } from "../../Application/Interfaces/UseCases/Agency/IAgencyGetSalesChartUseCase";
import { AgencyGetSalesChartUseCase } from "../../Application/UseCases/Agency/AgencyGetSalesChartUseCase";
import { IAgencyGetDeliveriesChartUseCase } from "../../Application/Interfaces/UseCases/Agency/IAgencyGetDeliveriesChartUseCase";
import { AgencyGetDeliveriesChartUseCase } from "../../Application/UseCases/Agency/AgencyGetDeliveriesChartUseCase";
import { IAgencyExportSalesReportUseCase } from "../../Application/Interfaces/UseCases/Agency/IAgencyExportSalesReportUseCase";
import { AgencyExportSalesReportUseCase } from "../../Application/UseCases/Agency/AgencyExportSalesReportUseCase";
import { INotificationRepository } from "../../Application/Interfaces/Repositories/Notification/INotificationRepository";
import { NotificationRepository } from "../Repositories/Notification/Notification.repository";
import { IGetNotificationsUseCase } from "../../Application/Interfaces/UseCases/Notification/IGetNotificationsUseCase";
import { GetNotificationsUseCase } from "../../Application/UseCases/Notification/GetNotificationsUseCase";
import { IMarkAsReadUseCase } from "../../Application/Interfaces/UseCases/Notification/IMarkAsReadUseCase";
import { MarkAsReadUseCase } from "../../Application/UseCases/Notification/MarkAsReadUseCase";
import { IMarkAllAsReadUseCase } from "../../Application/Interfaces/UseCases/Notification/IMarkAllAsReadUseCase";
import { MarkAllAsReadUseCase } from "../../Application/UseCases/Notification/MarkAllAsReadUseCase";
import { GetUnreadCountUseCase } from "../../Application/UseCases/Notification/GetUnreadCountUseCase";
import { IGetUnreadCountUseCase } from "../../Application/Interfaces/UseCases/Notification/IGetUnreadCountUseCase";
import { IWorkerResendOtpUseCase } from "../../Application/Interfaces/UseCases/Worker/IWorkerResendOtpUseCase";
import { WorkerResendOtpUseCase } from "../../Application/UseCases/Worker/WorkerResendOtpUseCase";
import { IGoogleAuthUseCase } from "../../Application/Interfaces/UseCases/Auth/IGoogleAuthUseCase";
import { GoogleAuthUseCase } from "../../Application/UseCases/Auth/GoogleAuthUseCase";
import { IUpdateRouteGroupStatusUseCase } from "../../Application/Interfaces/UseCases/Logistics/RouteGroup/IUpdateRouteGroupStatusUseCase";
import { UpdateRouteGroupStatusUseCase } from "../../Application/UseCases/Agency/RouteGroup/UpdateRouteGroupStatusUseCase";
import { IGetAdminDashboardOverviewUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminDashboardOverviewUseCase";
import { GetAdminDashboardOverviewUseCase } from "../../Application/UseCases/Admin/GetAdminDashboardOverviewUseCase";
import { IGetAdminRevenueChartUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminRevenueChartUseCase";
import { GetAdminRevenueChartUseCase } from "../../Application/UseCases/Admin/GetAdminRevenueChartUseCase";
import { IGetAdminBookingsChartUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminBookingsChartUseCase";
import { GetAdminBookingsChartUseCase } from "../../Application/UseCases/Admin/GetAdminBookingsChartUseCase";
import { IGetAdminBookingsReportUseCase } from "../../Application/Interfaces/UseCases/Admin/IGetAdminBookingsReportUseCase";
import { GetAdminBookingsReportUseCase } from "../../Application/UseCases/Admin/GetAdminBookingsReportUseCase";
import { IExportAdminBookingsReportUseCase } from "../../Application/Interfaces/UseCases/Admin/IExportAdminBookingsReportUseCase";
import { ExportAdminBookingsReportUseCase } from "../../Application/UseCases/Admin/ExportAdminBookingsReportUseCase";
import { IGetWorkerProfileUseCase } from "../../Application/Interfaces/UseCases/Worker/IGetWorkerProfileUseCase";
import { GetWorkerProfileUseCase } from "../../Application/UseCases/Worker/GetWorkerProfileUseCase";
import { IEditWorkerProfileUseCase } from "../../Application/Interfaces/UseCases/Worker/IEditWorkerProfileUseCase";
import { EditWorkerProfileUseCase } from "../../Application/UseCases/Worker/EditWorkerProfileUseCase";
import { IResetWorkerPasswordUseCase } from "../../Application/Interfaces/UseCases/Worker/IResetWorkerPasswordUseCase";
import { ResetWorkerPasswordUseCase } from "../../Application/UseCases/Worker/ResetWorkerPasswordUseCase";
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