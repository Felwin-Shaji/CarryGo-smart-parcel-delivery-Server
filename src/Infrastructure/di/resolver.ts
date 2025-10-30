import { container } from "tsyringe";
import { DependancyInjection } from "./container.js";

import { AuthController } from "../../Interface_Adapters/controllers/AuthController.js";



DependancyInjection.registerAll();

export const authController = container.resolve(AuthController);