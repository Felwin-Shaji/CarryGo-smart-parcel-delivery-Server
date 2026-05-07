import { container } from "tsyringe";
import { DependancyInjection } from "./container";
import { AuthController } from "../../Interface_Adapters/controllers/Auth/AuthController";
import { AgencyController } from "../../Interface_Adapters/controllers/Agency/AgencyController";
import { AdminAgencyController } from "../../Interface_Adapters/controllers/Admin/AdminAgencyController";
import { AdminUserController } from "../../Interface_Adapters/controllers/Admin/AdminUserController";
import { AgencyHubController } from "../../Interface_Adapters/controllers/Agency/AgencyHubController";
import { HubWorkerController } from "../../Interface_Adapters/controllers/Hub/hubWorkerController";
import { UserController } from "../../Interface_Adapters/controllers/User/userController";
import { UserBookingController } from "../../Interface_Adapters/controllers/User/bookingController";
import { AdminPricingPolicyController } from "../../Interface_Adapters/controllers/Admin/AdminPricingPolicyController";
import { AgencyPricingController } from "../../Interface_Adapters/controllers/Agency/AgencyPricing.controller";
import { AdminProfileController } from "../../Interface_Adapters/controllers/Admin/AdminProfile.controller";
import { AgencyProfileController } from "../../Interface_Adapters/controllers/Agency/AgencyProfile.controller";
import { AddressController } from "../../Interface_Adapters/controllers/User/address.controller";
import { AdminHubController } from "../../Interface_Adapters/controllers/Admin/AdminHubController";
import { WalletController } from "../../Interface_Adapters/controllers/User/wallet.controller";
import { PaymentController } from "../../Interface_Adapters/controllers/Payment/Payment.controller";
import { WorkerWalletController } from "../../Interface_Adapters/controllers/Worker/WorkerWallet.controller";
import { HubWalletController } from "../../Interface_Adapters/controllers/Hub/HubWallet.controller";
import { AdminWalletController } from "../../Interface_Adapters/controllers/Admin/AdminWallet.controller";
import { AgencyWalletController } from "../../Interface_Adapters/controllers/Agency/AgencyWallet.controller";
import { TravelerController } from "../../Interface_Adapters/controllers/User/traveler.controller";
import { AgencyRouteController } from "../../Interface_Adapters/controllers/Agency/AgencyRoute.controller";
import { AgencyRouteSegmentController } from "@/Interface_Adapters/controllers/Agency/AgencyRouteSegment.controller";
import { AgencyHubWorkerController } from "@/Interface_Adapters/controllers/Agency/AgencyHubWorker.controller";
import { HubShipmentController } from "@/Interface_Adapters/controllers/Hub/HubShipment.controller";
import { WorkerShipmentController } from "@/Interface_Adapters/controllers/Worker/WorkerShipment.controller";
import { UserTrackingController } from "@/Interface_Adapters/controllers/User/UserTracking.controller";
import { WorkerDashboardController } from "@/Interface_Adapters/controllers/Worker/WorkerDashboard.controller";
import { HubProfileController } from "@/Interface_Adapters/controllers/Hub/HubProfile.controller";
import { HubDashboardController } from "@/Interface_Adapters/controllers/Hub/HubDashboard.controller";
import { AgencyDashboardController } from "@/Interface_Adapters/controllers/Agency/AgencyDashboard.controller";


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

export const paymentController = container.resolve(PaymentController)
