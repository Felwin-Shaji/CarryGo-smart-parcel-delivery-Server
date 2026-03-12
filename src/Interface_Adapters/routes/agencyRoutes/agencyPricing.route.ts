import { BaseRoute } from "../base.route";
import { agencyPricingController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AgencyPricingRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/agency-pricing-policy",
      authenticate(["agency"]),
      asyncHandler(agencyPricingController.getAgencyPricing)
    );

    this.router.post(
      "/agency-pricing-policy",
      authenticate(["agency"]),
      asyncHandler(agencyPricingController.upsertAgencyPricing)
    );

  }
}