import { container } from "tsyringe";
import { DependancyInjection } from "./container.js";

import { AuthController } from "../../Interface_Adapters/controllers/AuthController.js";
import { AgencyController } from "../../Interface_Adapters/controllers/AgencyController.js";



DependancyInjection.registerAll();

export const authController = container.resolve(AuthController);
export const agencyController = container.resolve(AgencyController);