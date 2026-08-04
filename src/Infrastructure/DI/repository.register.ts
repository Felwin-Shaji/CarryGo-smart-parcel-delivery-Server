import { container } from "tsyringe";
import { OtpRepository } from "../Repositories/otpRepository";
import type { IOtpRepository } from "../../Application/Interfaces/Repositories/Auth/otp.repository";
import { UserRepository } from "../Repositories/userRepository";
import type { IUserRepository } from "../../Application/Interfaces/Repositories/User/user.repository";
import type { IAdminRepository } from "../../Application/Interfaces/Repositories/Admin/IAdminRepository";
import { AdminRepository } from "../Repositories/Admin/Admin.repository";
import type { IAgencyRepository } from "../../Application/Interfaces/Repositories/Agency/agency.repository";
import { IAgencyKYCRepository } from "../../Application/Interfaces/Repositories/Agency/AgencyKYC";
import { AgencyKYCRepository } from "../Repositories/Agency/AgencyKYCRepository";
import { AgencyRepository } from "../Repositories/Agency/agencyRepository";
import { IHubRepository } from "../../Application/Interfaces/Repositories/Hub/hub.repository";
import { HubRepository } from "../Repositories/Hub/hubRepository";
import { IHubTempRepository } from "../../Application/Interfaces/Repositories/Hub/hubTemp.repository";
import { HubTempRepository } from "../Repositories/Hub/hubTempRepository";
import { IResetPasswordTokenRepository } from "../../Application/Interfaces/Repositories/Auth/resetPasswordToken.repository";
import { ResetPasswordTokenRepository } from "../Repositories/resetPasswordTokenRepository";
import { IHubWorkerKycRepository } from "../../Application/Interfaces/Repositories/Worker/wrokerKyc.repository";
import { HubWorkerKycRepository } from "../Repositories/Worker/hubWorkerKycRepository";
import { IHubWorkersTempRepository } from "../../Application/Interfaces/Repositories/Worker/worersTemp.repository";
import { HubWorkersTempRepository } from "../Repositories/Worker/hubWorkersTempRepository";
import { IHubWorkerRepository } from "../../Application/Interfaces/Repositories/Worker/worker.repository";
import { HubWorkerRepository } from "../Repositories/Worker/hubWorkerRepository";
import { IPricingPolicyRepository } from "../../Application/Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { PricingPolicyRepository } from "../Repositories/Admin/PricingPolicy.repository";
import { IAgencyPricingRepository } from "../../Application/Interfaces/Repositories/Agency/agencyPricing.repository";
import { AgencyPricingRepository } from "../Repositories/Agency/AgencyPricingRepository";
import { IBookingRepository } from "../../Application/Interfaces/Repositories/User/IBookingRepository";
import { BookingRepository } from "../Repositories/User/Booking.repository";
import { ITransactionRepository } from "../../Application/Interfaces/Repositories/Wallet/ITransactionRepository";
import { TransactionRepository } from "../Repositories/Wallet/transaction.repository";
import { IWalletRepository } from "../../Application/Interfaces/Repositories/Wallet/IWalletRepository";
import { WalletRepository } from "../Repositories/Wallet/wallet.repository";
import { ITravelRequestRepository } from "../../Application/Interfaces/Repositories/User/ITravelRequestRepository";
import { TravelRequestRepository } from "../Repositories/User/TravelRequest.repository";
import { IAgencyRouteGroupRepository } from "../../Application/Interfaces/Repositories/Logistics/IAgencyRouteGroupRepository";
import { AgencyRouteGroupRepository } from "../Repositories/Agency/AgencyRouteGroup.repository";
import { IAgencyRouteSegmentRepository } from "../../Application/Interfaces/Repositories/Logistics/IAgencyRouteSegmentRepository";
import { AgencyRouteSegmentRepository } from "../Repositories/Agency/AgencyRouteSegment.repository";
import { IParcelRouteLegRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelRouteLegRepository";
import { ParcelRouteLegRepository } from "../Repositories/Logistics/ParcelRouteLeg.repository";
import { IParcelRouteRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelRouteRepository";
import { ParcelRouteRepository } from "../Repositories/Logistics/ParcelRoute.repository";
import { IHubShipmentRepository } from "../../Application/Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { HubShipmentRepository } from "../Repositories/Logistics/HubShipment.repository";
import { IShipmentParcelRepository } from "../../Application/Interfaces/Repositories/Logistics/IShipmentParcelRepository";
import { ShipmentParcelRepository } from "../Repositories/Logistics/ShipmentParcel.repository";
import { IParcelMovementRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelMovementRepository";
import { ParcelMovementRepository } from "../Repositories/Logistics/ParcelMovement.repository";
import { ICounterRepository } from "../../Application/Interfaces/Repositories/ICounterRepository";
import { CounterRepository } from "../Repositories/Counter.repository";
import { IMessageRepository } from "../../Application/Interfaces/Repositories/Chat/IMessageRepository";
import { MessageRepository } from "../Repositories/Chat/Message.repository";
import { IChatRepository } from "../../Application/Interfaces/Repositories/Chat/IChatRepository";
import { ChatRepository } from "../Repositories/Chat/Chat.repository";
import { INotificationRepository } from "../../Application/Interfaces/Repositories/Notification/INotificationRepository";
import { NotificationRepository } from "../Repositories/Notification/Notification.repository";
import { IAdminDashboardRepository } from "../../Application/Interfaces/Repositories/Admin/IAdminDashboardRepository";
import { AdminDashboardRepository } from "../Repositories/Admin/AdminDashboard.repository";


export class RepositoryRegistry {
    static registerRepositories(): void {

        container.register<IOtpRepository>("IOtpRepository", {
            useClass: OtpRepository
        });

        container.register<IUserRepository>("IUserRepository", {
            useClass: UserRepository
        });

        container.register<IAgencyRepository>("IAgencyRepository", {
            useClass: AgencyRepository
        });

        container.register<IResetPasswordTokenRepository>("IResetPasswordTokenRepository", {
            useClass: ResetPasswordTokenRepository
        });

        container.register<IAdminRepository>("IAdminRepository", {
            useClass: AdminRepository
        });

        container.register<IAgencyKYCRepository>("IAgencyKYCRepository", {
            useClass: AgencyKYCRepository
        });

        container.register<IHubTempRepository>("IHubTempRepository", {
            useClass: HubTempRepository
        });

        container.register<IHubRepository>("IHubRepository", {
            useClass: HubRepository
        });

        container.register<IHubWorkersTempRepository>("IHubWorkersTempRepository", {
            useClass: HubWorkersTempRepository
        })

        container.register<IHubWorkerRepository>("IHubWorkerRepository", {
            useClass: HubWorkerRepository
        })

        container.register<IHubWorkerKycRepository>("IHubWorkerKycRepository", {
            useClass: HubWorkerKycRepository
        })

        container.register<IPricingPolicyRepository>("IPricingPolicyRepository", {
            useClass: PricingPolicyRepository
        })

        container.register<IAgencyPricingRepository>("IAgencyPricingRepository", {
            useClass: AgencyPricingRepository
        });

        container.register<IBookingRepository>("IBookingRepository", {
            useClass: BookingRepository
        })

        container.register<IWalletRepository>("IWalletRepository", {
            useClass: WalletRepository
        })

        container.register<ITransactionRepository>("ITransactionRepository", {
            useClass: TransactionRepository
        });

        container.register<ITravelRequestRepository>("ITravelRequestRepository", {
            useClass: TravelRequestRepository
        })

        container.register<IAgencyRouteGroupRepository>("IAgencyRouteGroupRepository", {
            useClass: AgencyRouteGroupRepository
        })

        container.register<IAgencyRouteSegmentRepository>("IAgencyRouteSegmentRepository", {
            useClass: AgencyRouteSegmentRepository
        })

        container.register<IParcelRouteRepository>("IParcelRouteRepository", {
            useClass: ParcelRouteRepository
        })

        container.register<IParcelRouteLegRepository>("IParcelRouteLegRepository", {
            useClass: ParcelRouteLegRepository
        })

        container.register<IHubShipmentRepository>("IHubShipmentRepository", {
            useClass: HubShipmentRepository
        })

        container.register<IShipmentParcelRepository>("IShipmentParcelRepository", {
            useClass: ShipmentParcelRepository
        })

        container.register<IParcelMovementRepository>("IParcelMovementRepository", {
            useClass: ParcelMovementRepository
        })

        container.register<ICounterRepository>("ICounterRepository", {
            useClass: CounterRepository
        })

        container.register<IMessageRepository>("IMessageRepository", {
            useClass: MessageRepository
        })

        container.register<IChatRepository>("IChatRepository", {
            useClass: ChatRepository
        });

        container.register<INotificationRepository>("INotificationRepository", {
            useClass: NotificationRepository
        });

        container.register<IAdminDashboardRepository>("IAdminDashboardRepository", {
            useClass: AdminDashboardRepository
        })
    };
};