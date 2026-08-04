import { container } from "tsyringe";
import { DependancyInjection } from "./container";
import { AuthController } from "../../InterfaceAdapters/Controllers/Auth/AuthController";
import { AgencyController } from "../../InterfaceAdapters/Controllers/Agency/AgencyController";
import { AdminAgencyController } from "../../InterfaceAdapters/Controllers/Admin/AdminAgencyController";
import { AdminUserController } from "../../InterfaceAdapters/Controllers/Admin/AdminUserController";
import { AgencyHubController } from "../../InterfaceAdapters/Controllers/Agency/AgencyHub.controller";
import { HubWorkerController } from "../../InterfaceAdapters/Controllers/Hub/hubWorkerController";
import { UserController } from "../../InterfaceAdapters/Controllers/User/userController";
import { UserBookingController } from "../../InterfaceAdapters/Controllers/User/bookingController";
import { AdminPricingPolicyController } from "../../InterfaceAdapters/Controllers/Admin/AdminPricingPolicyController";
import { AgencyPricingController } from "../../InterfaceAdapters/Controllers/Agency/AgencyPricing.controller";
import { AdminProfileController } from "../../InterfaceAdapters/Controllers/Admin/AdminProfile.controller";
import { AgencyProfileController } from "../../InterfaceAdapters/Controllers/Agency/AgencyProfile.controller";
import { AddressController } from "../../InterfaceAdapters/Controllers/User/address.controller";
import { AdminHubController } from "../../InterfaceAdapters/Controllers/Admin/AdminHubController";
import { WalletController } from "../../InterfaceAdapters/Controllers/User/wallet.controller";
import { PaymentController } from "../../InterfaceAdapters/Controllers/Payment/Payment.controller";
import { WorkerWalletController } from "../../InterfaceAdapters/Controllers/Worker/WorkerWallet.controller";
import { HubWalletController } from "../../InterfaceAdapters/Controllers/Hub/HubWallet.controller";
import { AdminWalletController } from "../../InterfaceAdapters/Controllers/Admin/AdminWallet.controller";
import { AgencyWalletController } from "../../InterfaceAdapters/Controllers/Agency/AgencyWallet.controller";
import { TravelerController } from "../../InterfaceAdapters/Controllers/User/traveler.controller";
import { AgencyRouteController } from "../../InterfaceAdapters/Controllers/Agency/AgencyRoute.controller";
import { UserTrackingController } from "../../InterfaceAdapters/Controllers/User/UserTracking.controller";
import { AgencyHubWorkerController } from "../../InterfaceAdapters/Controllers/Agency/AgencyHubWorker.controller";
import { AgencyRouteSegmentController } from "../../InterfaceAdapters/Controllers/Agency/AgencyRouteSegment.controller";
import { AgencyDashboardController } from "../../InterfaceAdapters/Controllers/Agency/AgencyDashboard.controller";
import { HubShipmentController } from "../../InterfaceAdapters/Controllers/Hub/HubShipment.controller";
import { HubDashboardController } from "../../InterfaceAdapters/Controllers/Hub/HubDashboard.controller";
import { HubProfileController } from "../../InterfaceAdapters/Controllers/Hub/HubProfile.controller";
import { WorkerShipmentController } from "../../InterfaceAdapters/Controllers/Worker/WorkerShipment.controller";
import { WorkerDashboardController } from "../../InterfaceAdapters/Controllers/Worker/WorkerDashboard.controller";
import { AdminDashboardController } from "../../InterfaceAdapters/Controllers/Admin/AdminDashboard.controller";
import { WorkerProfileController } from "../../InterfaceAdapters/Controllers/Worker/WorkerProfile.controller";


DependancyInjection.registerAll();

export const authController = container.resolve(AuthController);
export const adminProfileController = container.resolve(AdminProfileController);

export const userController = container.resolve(UserController)
export const bookingController = container.resolve(UserBookingController);
export const addressController = container.resolve(AddressController);
export const walletController = container.resolve(WalletController);
export const travelerController = container.resolve(TravelerController);
export const userTrackingController = container.resolve(UserTrackingController);



export const agencyController = container.resolve(AgencyController);
export const agencyProfileController = container.resolve(AgencyProfileController);
export const agencyHubController = container.resolve(AgencyHubController);
export const agencyHubWorkerController = container.resolve(AgencyHubWorkerController)
export const agencyPricingController = container.resolve(AgencyPricingController);
export const agencyWalletController = container.resolve(AgencyWalletController);
export const agencyRouteController = container.resolve(AgencyRouteController);
export const agencyRouteSegmentController = container.resolve(AgencyRouteSegmentController)
export const agencyDashboardController = container.resolve(AgencyDashboardController);


export const adminDashboardController = container.resolve(AdminDashboardController)
export const adminAgencyController = container.resolve(AdminAgencyController);
export const adminHubController = container.resolve(AdminHubController);
export const adminUserController = container.resolve(AdminUserController);
export const adminPricingPolicyController = container.resolve(AdminPricingPolicyController);
export const adminWalletController = container.resolve(AdminWalletController);

// export const hubWorkerProfileController = container.resolve(HubWorkerProfileController)
export const hubWorkerController = container.resolve(HubWorkerController);
export const hubWalletController = container.resolve(HubWalletController);
export const hubShipmentController = container.resolve(HubShipmentController);
export const hubDashboardController = container.resolve(HubDashboardController);


export const hubProfileController = container.resolve(HubProfileController)
export const workerWalletController = container.resolve(WorkerWalletController);
export const workerShipmentController = container.resolve(WorkerShipmentController);
export const workerDashboardController = container.resolve(WorkerDashboardController);
export const workerProfileController = container.resolve(WorkerProfileController);

export const paymentController = container.resolve(PaymentController)
