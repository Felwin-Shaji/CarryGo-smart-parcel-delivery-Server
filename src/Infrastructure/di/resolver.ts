import { container } from "tsyringe";
import { DependancyInjection } from "./container.js";
import { AuthController } from "../../Interface_Adapters/controllers/Auth/AuthController.js";
import { AgencyController } from "../../Interface_Adapters/controllers/Agency/AgencyController.js";
import { AdminAgencyController } from "../../Interface_Adapters/controllers/Admin/AdminAgencyController.js";
import { AdminUserController } from "../../Interface_Adapters/controllers/Admin/AdminUserController.js";
// import { AdminController } from "../../Interface_Adapters/controllers/Admin/AdminController.js";



DependancyInjection.registerAll();

export const authController = container.resolve(AuthController);
export const agencyController = container.resolve(AgencyController);


export const adminAgencyController = container.resolve(AdminAgencyController);
export const adminUserController = container.resolve(AdminUserController);
