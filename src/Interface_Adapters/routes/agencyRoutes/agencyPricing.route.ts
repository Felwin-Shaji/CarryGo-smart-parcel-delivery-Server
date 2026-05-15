import { BaseRoute } from "../base.route";
import { agencyPricingController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { agencyPricingSchema } from "../../validators/AgencyValidator/agency.validator";
import { validateRequest } from "../../middlewares/ValidationMiddleware/validateRequest";

export class AgencyPricingRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/agency-pricing-policy", authenticate([Role.AGENCY]), asyncHandler(agencyPricingController.getAgencyPricing));

    this.router.post("/agency-pricing-policy", authenticate([Role.AGENCY]), validateRequest(agencyPricingSchema), asyncHandler(agencyPricingController.upsertAgencyPricing));

  }
}