import { container } from "tsyringe";
import { DependancyInjection } from "./container.js";
import { AuthController } from "../../Interface_Adapters/controllers/Auth/AuthController.js";
import { AgencyController } from "../../Interface_Adapters/controllers/Agency/AgencyController.js";
import { AdminAgencyController } from "../../Interface_Adapters/controllers/Admin/AdminAgencyController.js";
import { AdminUserController } from "../../Interface_Adapters/controllers/Admin/AdminUserController.js";
import { AgencyHubController } from "../../Interface_Adapters/controllers/Agency/AgencyHubController.js";
import { HubWorkerController } from "../../Interface_Adapters/controllers/Hub/hubWorkerController.js";
import { UserController } from "../../Interface_Adapters/controllers/User/userController.js";
import { UserBookingController } from "../../Interface_Adapters/controllers/User/bookingController.js";
import { AdminPricingPolicyController } from "../../Interface_Adapters/controllers/Admin/AdminPricingPolicyController.js";
import { AgencyPricingController } from "../../Interface_Adapters/controllers/Agency/AgencyPricing.controller.js";
import { AdminProfileController } from "../../Interface_Adapters/controllers/Admin/AdminProfile.controller.js";
import { AgencyProfileController } from "../../Interface_Adapters/controllers/Agency/AgencyProfile.controller.js";
import { AddressController } from "../../Interface_Adapters/controllers/User/address.controller.js";
import { AdminHubController } from "../../Interface_Adapters/controllers/Admin/AdminHubController.js";
// import { AdminController } from "../../Interface_Adapters/controllers/Admin/AdminController.js";



DependancyInjection.registerAll();

export const authController = container.resolve(AuthController);
export const adminProfileController = container.resolve(AdminProfileController);

export const userController = container.resolve(UserController)
export const bookingController = container.resolve(UserBookingController);
export const addressController = container.resolve(AddressController);



export const agencyController = container.resolve(AgencyController);
export const agencyProfileController = container.resolve(AgencyProfileController);
export const agencyHubController = container.resolve(AgencyHubController);
export const agencyPricingController = container.resolve(AgencyPricingController);


export const adminAgencyController = container.resolve(AdminAgencyController);
export const adminHubController = container.resolve(AdminHubController);
export const adminUserController = container.resolve(AdminUserController);
export const adminPricingPolicyController = container.resolve(AdminPricingPolicyController);

export const hubWorkerController = container.resolve(HubWorkerController)
