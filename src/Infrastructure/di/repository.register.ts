import { container } from "tsyringe";
import { OtpRepository } from "../repositories/otpRepository";
import type { IOtpRepository } from "../../Application/Interfaces/Repositories/Auth/otp.repository";
import { UserRepository } from "../repositories/userRepository";
import type { IUserRepository } from "../../Application/Interfaces/Repositories/User/user.repository";
import type { IAdminRepository } from "../../Application/Interfaces/Repositories/Admin/IAdminRepository";
import { AdminRepository } from "../repositories/Admin/Admin.repository";
import type { IAgencyRepository } from "../../Application/Interfaces/Repositories/Agency/agency.repository";
import { IAgencyKYCRepository } from "../../Application/Interfaces/Repositories/Agency/AgencyKYC";
import { AgencyKYCRepository } from "../repositories/Agency/AgencyKYCRepository";
import { AgencyRepository } from "../repositories/Agency/agencyRepository";
import { IHubRepository } from "../../Application/Interfaces/Repositories/Hub/hub.repository";
import { HubRepository } from "../repositories/Hub/hubRepository";
import { IHubTempRepository } from "../../Application/Interfaces/Repositories/Hub/hubTemp.repository";
import { HubTempRepository } from "../repositories/Hub/hubTempRepository";
import { IResetPasswordTokenRepository } from "../../Application/Interfaces/Repositories/Auth/resetPasswordToken.repository";
import { ResetPasswordTokenRepository } from "../repositories/resetPasswordTokenRepository";
import { IHubWorkerKycRepository } from "../../Application/Interfaces/Repositories/Worker/wrokerKyc.repository";
import { HubWorkerKycRepository } from "../repositories/Worker/hubWorkerKycRepository";
import { IHubWorkersTempRepository } from "../../Application/Interfaces/Repositories/Worker/worersTemp.repository";
import { HubWorkersTempRepository } from "../repositories/Worker/hubWorkersTempRepository";
import { IHubWorkerRepository } from "../../Application/Interfaces/Repositories/Worker/worker.repository";
import { HubWorkerRepository } from "../repositories/Worker/hubWorkerRepository";
import { IPricingPolicyRepository } from "../../Application/Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { PricingPolicyRepository } from "../repositories/Admin/PricingPolicy.repository";
import { IAgencyPricingRepository } from "../../Application/Interfaces/Repositories/Agency/agencyPricing.repository";
import { AgencyPricingRepository } from "../repositories/Agency/AgencyPricingRepository";
import { IBookingRepository } from "../../Application/Interfaces/Repositories/User/IBookingRepository";
import { BookingRepository } from "../repositories/User/Booking.repository";
import { ITransactionRepository } from "../../Application/Interfaces/Repositories/Wallet/ITransactionRepository";
import { TransactionRepository } from "../repositories/Wallet/transaction.repository";
import { IWalletRepository } from "../../Application/Interfaces/Repositories/Wallet/IWalletRepository";
import { WalletRepository } from "../repositories/Wallet/wallet.repository";
import { ITravelRequestRepository } from "../../Application/Interfaces/Repositories/User/ITravelRequestRepository";
import { TravelRequestRepository } from "../repositories/User/TravelRequest.repository";
import { IAgencyRouteGroupRepository } from "../../Application/Interfaces/Repositories/Logistics/IAgencyRouteGroupRepository";
import { AgencyRouteGroupRepository } from "../repositories/Agency/AgencyRouteGroup.repository";
import { IAgencyRouteSegmentRepository } from "../../Application/Interfaces/Repositories/Logistics/IAgencyRouteSegmentRepository";
import { AgencyRouteSegmentRepository } from "../repositories/Agency/AgencyRouteSegment.repository";
import { IParcelRouteLegRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelRouteLegRepository";
import { ParcelRouteLegRepository } from "../repositories/Logistics/ParcelRouteLeg.repository";
import { IParcelRouteRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelRouteRepository";
import { ParcelRouteRepository } from "../repositories/Logistics/ParcelRoute.repository";
import { IHubShipmentRepository } from "../../Application/Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { HubShipmentRepository } from "../repositories/Logistics/HubShipment.repository";
import { IShipmentParcelRepository } from "../../Application/Interfaces/Repositories/Logistics/IShipmentParcelRepository";
import { ShipmentParcelRepository } from "../repositories/Logistics/ShipmentParcel.repository";
import { IParcelMovementRepository } from "../../Application/Interfaces/Repositories/Logistics/IParcelMovementRepository";
import { ParcelMovementRepository } from "../repositories/Logistics/ParcelMovement.repository";
import { ICounterRepository } from "../../Application/Interfaces/Repositories/ICounterRepository";
import { CounterRepository } from "../repositories/Counter.repository";
import { IMessageRepository } from "../../Application/Interfaces/Repositories/Chat/IMessageRepository";
import { MessageRepository } from "../repositories/Chat/Message.repository";
import { IChatRepository } from "../../Application/Interfaces/Repositories/Chat/IChatRepository";
import { ChatRepository } from "../repositories/Chat/Chat.repository";
import { INotificationRepository } from "../../Application/Interfaces/Repositories/Notification/INotificationRepository";
import { NotificationRepository } from "../repositories/Notification/Notification.repository";
import { IAdminDashboardRepository } from "../../Application/Interfaces/Repositories/Admin/IAdminDashboardRepository";
import { AdminDashboardRepository } from "../repositories/Admin/AdminDashboard.repository";


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