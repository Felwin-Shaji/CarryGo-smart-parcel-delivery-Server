import { container } from "tsyringe";
import { DependancyInjection } from "./container";
import { AuthController } from "../../InterfaceAdapters/Controllers/Auth/AuthController";
import { AgencyController } from "../../InterfaceAdapters/Controllers/Agency/AgencyController";
import { AdminAgencyController } from "../../InterfaceAdapters/Controllers/Admin/AdminAgencyController";
import { AdminUserController } from "../../InterfaceAdapters/Controllers/Admin/AdminUserController";
import { AgencyHubController } from "../../InterfaceAdapters/Controllers/Agency/AgencyHubController";
import { HubWorkerController } from "../../InterfaceAdapters/Controllers/Hub/HubWorkerController";
import { UserController } from "../../InterfaceAdapters/Controllers/User/UserController";
import { UserBookingController } from "../../InterfaceAdapters/Controllers/User/UserBookingController";
import { AdminPricingPolicyController } from "../../InterfaceAdapters/Controllers/Admin/AdminPricingPolicyController";
import { AgencyPricingController } from "../../InterfaceAdapters/Controllers/Agency/AgencyPricingController";
import { AdminProfileController } from "../../InterfaceAdapters/Controllers/Admin/AdminProfileController";
import { AgencyProfileController } from "../../InterfaceAdapters/Controllers/Agency/AgencyProfileController";
import { AddressController } from "../../InterfaceAdapters/Controllers/User/AddressController";
import { AdminHubController } from "../../InterfaceAdapters/Controllers/Admin/AdminHubController";
import { WalletController } from "../../InterfaceAdapters/Controllers/User/WalletController";
import { PaymentController } from "../../InterfaceAdapters/Controllers/Payment/PaymentController";
import { WorkerWalletController } from "../../InterfaceAdapters/Controllers/Worker/WorkerWalletController";
import { HubWalletController } from "../../InterfaceAdapters/Controllers/Hub/HubWalletController";
import { AdminWalletController } from "../../InterfaceAdapters/Controllers/Admin/AdminWalletController";
import { AgencyWalletController } from "../../InterfaceAdapters/Controllers/Agency/AgencyWalletController";
import { TravelerController } from "../../InterfaceAdapters/Controllers/User/TravelerController";
import { AgencyRouteController } from "../../InterfaceAdapters/Controllers/Agency/AgencyRouteController";
import { UserTrackingController } from "../../InterfaceAdapters/Controllers/User/UserTrackingController";
import { AgencyHubWorkerController } from "../../InterfaceAdapters/Controllers/Agency/AgencyHubWorkerController";
import { AgencyRouteSegmentController } from "../../InterfaceAdapters/Controllers/Agency/AgencyRouteSegmentController";
import { AgencyDashboardController } from "../../InterfaceAdapters/Controllers/Agency/AgencyDashboardController";
import { HubShipmentController } from "../../InterfaceAdapters/Controllers/Hub/HubShipmentController";
import { HubDashboardController } from "../../InterfaceAdapters/Controllers/Hub/HubDashboardController";
import { HubProfileController } from "../../InterfaceAdapters/Controllers/Hub/HubProfileController";
import { WorkerShipmentController } from "../../InterfaceAdapters/Controllers/Worker/WorkerShipmentController";
import { WorkerDashboardController } from "../../InterfaceAdapters/Controllers/Worker/WorkerDashboardController";
import { AdminDashboardController } from "../../InterfaceAdapters/Controllers/Admin/AdminDashboardController";
import { WorkerProfileController } from "../../InterfaceAdapters/Controllers/Worker/WorkerProfileController";


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
