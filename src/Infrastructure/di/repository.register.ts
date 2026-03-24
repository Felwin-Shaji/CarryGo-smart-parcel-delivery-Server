import { container } from "tsyringe";
import { OtpRepository } from "../repositories/otpRepository";
import type { IOtpRepository } from "../../Application/interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository";
import { UserRepository } from "../repositories/userRepository";
import type { IUserRepository } from "../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import type { IAdminRepository } from "../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";
import { AdminRepository } from "../repositories/adminRepository";
import type { IAgencyRepository } from "../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IAgencyKYCRepository } from "../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/AgencyKYC";
import { AgencyKYCRepository } from "../repositories/Agency/AgencyKYCRepository";
import { AgencyRepository } from "../repositories/Agency/agencyRepository";
import { IHubRepository } from "../../Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { HubRepository } from "../repositories/Hub/hubRepository";
import { IHubTempRepository } from "../../Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository";
import { HubTempRepository } from "../repositories/Hub/hubTempRepository";
import { IResetPasswordTokenRepository } from "../../Application/interfaces/repositories_interfaces/authRepositories_Interfaces/resetPasswordToken.repository";
import { ResetPasswordTokenRepository } from "../repositories/resetPasswordTokenRepository";
import { IHubWorkerKycRepository } from "../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { HubWorkerKycRepository } from "../repositories/Worker/hubWorkerKycRepository";
import { IHubWorkersTempRepository } from "../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { HubWorkersTempRepository } from "../repositories/Worker/hubWorkersTempRepository";
import { IHubWorkerRepository } from "../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { HubWorkerRepository } from "../repositories/Worker/hubWorkerRepository";
import { IPricingPolicyRepository } from "../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { PricingPolicyRepository } from "../repositories/Admin/PricingPolicyRepository";
import { IAgencyPricingRepository } from "../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";
import { AgencyPricingRepository } from "../repositories/Agency/AgencyPricingRepository";
import { IBookingRepository } from "../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { BookingRepository } from "../repositories/User/Booking.repository";
import { ITransactionRepository } from "../../Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { TransactionRepository } from "../repositories/Wallet/transaction.repository";
import { IWalletRepository } from "../../Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { WalletRepository } from "../repositories/Wallet/wallet.repository";
import { ITravelRequestRepository } from "../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { TravelRequestRepository } from "../repositories/User/TravelRequest.repository";
import { IAgencyRouteGroupRepository } from "../../Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteGroupRepository";
import { AgencyRouteGroupRepository } from "../repositories/Agency/AgencyRouteGroup.repository";
import { IAgencyRouteSegmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { AgencyRouteSegmentRepository } from "../repositories/Agency/AgencyRouteSegment.repository";
import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { ParcelRouteLegRepository } from "../repositories/Logistics/ParcelRouteLeg.repository";
import { IParcelRouteRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteRepository";
import { ParcelRouteRepository } from "../repositories/Logistics/ParcelRoute.repository";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { HubShipmentRepository } from "../repositories/Logistics/HubShipment.repository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { ShipmentParcelRepository } from "../repositories/Logistics/ShipmentParcel.repository";
import { IParcelMovementRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { ParcelMovementRepository } from "../repositories/Logistics/ParcelMovement.repository";


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

        container.register<IParcelRouteRepository>("IParcelRouteRepository",{
            useClass:ParcelRouteRepository
        })

        container.register<IParcelRouteLegRepository>("IParcelRouteLegRepository",{
            useClass:ParcelRouteLegRepository
        })

        container.register<IHubShipmentRepository>("IHubShipmentRepository",{
            useClass:HubShipmentRepository
        })

        container.register<IShipmentParcelRepository>("IShipmentParcelRepository",{
            useClass:ShipmentParcelRepository
        })

        container.register<IParcelMovementRepository>("IParcelMovementRepository",{
            useClass:ParcelMovementRepository
        })
    };
};