import { container } from "tsyringe";
import { OtpRepository } from "../Repositories/OTPRepository";
import type { IOtpRepository } from "../../Application/Interfaces/Repositories/Auth/IOTPRepository";
import { UserRepository } from "../Repositories/UserRepository";
import type { IUserRepository } from "../../Application/Interfaces/Repositories/User/IUserRepository";
import type { IAdminRepository } from "../../Application/Interfaces/Repositories/Admin/IAdminRepository";
import { AdminRepository } from "../Repositories/Admin/AdminRepository";
import type { IAgencyRepository } from "../../Application/Interfaces/Repositories/Agency/IAgencyRepository";
import { IAgencyKYCRepository } from "../../Application/Interfaces/Repositories/Agency/IAgencyKYCRepository";
import { AgencyKYCRepository } from "../Repositories/Agency/AgencyKYCRepository";
import { AgencyRepository } from "../Repositories/Agency/AgencyRepository";
import { IHubRepository } from "../../Application/Interfaces/Repositories/Hub/IHubRepository";
import { HubRepository } from "../Repositories/Hub/HubRepository";
import { IHubTempRepository } from "../../Application/Interfaces/Repositories/Hub/IHubTempRepository";
import { HubTempRepository } from "../Repositories/Hub/HubTempRepository";
import { IResetPasswordTokenRepository } from "../../Application/Interfaces/Repositories/Auth/IResetPasswordTokenRepository";
import { ResetPasswordTokenRepository } from "../Repositories/ResetPasswordTokenRepository";
import { IHubWorkerKycRepository } from "../../Application/Interfaces/Repositories/Worker/IHubWorkerKycRepository";
import { HubWorkerKycRepository } from "../Repositories/Worker/HubWorkerKYCRepository";
import { IHubWorkersTempRepository } from "../../Application/Interfaces/Repositories/Worker/IHubWorkersTempRepository";
import { HubWorkersTempRepository } from "../Repositories/Worker/HubWorkersTempRepository";
import { IHubWorkerRepository } from "../../Application/Interfaces/Repositories/Worker/IHubWorkerRepository";
import { HubWorkerRepository } from "../Repositories/Worker/HubWorkerRepository";
import { IPricingPolicyRepository } from "../../Application/Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { PricingPolicyRepository } from "../Repositories/Admin/PricingPolicyRepository";
import { IAgencyPricingRepository } from "../../Application/Interfaces/Repositories/Agency/IAgencyPricingRepository";
import { AgencyPricingRepository } from "../Repositories/Agency/AgencyPricingRepository";
import { IBookingRepository } from "../../Application/Interfaces/Repositories/User/IBookingRepository";
import { BookingRepository } from "../Repositories/User/BookingRepository";
import { ITransactionRepository } from "../../Application/Interfaces/Repositories/Wallet/ITransactionRepository";
import { TransactionRepository } from "../Repositories/Wallet/TransactionRepository";
import { IWalletRepository } from "../../Application/Interfaces/Repositories/Wallet/IWalletRepository";
import { WalletRepository } from "../Repositories/Wallet/WalletRepository";
import { ITravelRequestRepository } from "../../Application/Interfaces/Repositories/User/ITravelRequestRepository";
import { TravelRequestRepository } from "../Repositories/User/TravelRequestRepository";
import { IAgencyRouteGroupRepository } from "../../Application/Interfaces/Repositories/Logistics/IAgencyRouteGroupRepository";
import { AgencyRouteGroupRepository } from "../Repositories/Agency/AgencyRouteGroupRepository";
import { IAgencyRouteSegmentRepository } from "../../Application/Interfaces/Repositories/Logistics/IAgencyRouteSegmentRepository";
import { AgencyRouteSegmentRepository } from "../Repositories/Agency/AgencyRouteSegmentRepository";
import { IParcelRouteLegRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelRouteLegRepository";
import { ParcelRouteLegRepository } from "../Repositories/Logistics/ParcelRouteLegRepository";
import { IParcelRouteRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelRouteRepository";
import { ParcelRouteRepository } from "../Repositories/Logistics/ParcelRouteRepository";
import { IHubShipmentRepository } from "../../Application/Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { HubShipmentRepository } from "../Repositories/Logistics/HubShipmentRepository";
import { IShipmentParcelRepository } from "../../Application/Interfaces/Repositories/Logistics/IShipmentParcelRepository";
import { ShipmentParcelRepository } from "../Repositories/Logistics/ShipmentParcelRepository";
import { IParcelMovementRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelMovementRepository";
import { ParcelMovementRepository } from "../Repositories/Logistics/ParcelMovementRepository";
import { ICounterRepository } from "../../Application/Interfaces/Repositories/ICounterRepository";
import { CounterRepository } from "../Repositories/CounterRepository";
import { IMessageRepository } from "../../Application/Interfaces/Repositories/Chat/IMessageRepository";
import { MessageRepository } from "../Repositories/Chat/MessageRepository";
import { IChatRepository } from "../../Application/Interfaces/Repositories/Chat/IChatRepository";
import { ChatRepository } from "../Repositories/Chat/ChatRepository";
import { INotificationRepository } from "../../Application/Interfaces/Repositories/Notification/INotificationRepository";
import { NotificationRepository } from "../Repositories/Notification/NotificationRepository";
import { IAdminDashboardRepository } from "../../Application/Interfaces/Repositories/Admin/IAdminDashboardRepository";
import { AdminDashboardRepository } from "../Repositories/Admin/AdminDashboardRepository";


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