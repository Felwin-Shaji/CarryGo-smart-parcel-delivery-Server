import { BaseRoute } from "../BaseRoute";
import { agencyPricingController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { agencyPricingSchema } from "../../Validators/Agency/agencyValidator";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";

export class AgencyPricingRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/agency-pricing-policy", authenticate([Role.AGENCY]), asyncHandler(agencyPricingController.getAgencyPricing));

    this.router.post("/agency-pricing-policy", authenticate([Role.AGENCY]), validateRequest(agencyPricingSchema), asyncHandler(agencyPricingController.upsertAgencyPricing));

  }
}