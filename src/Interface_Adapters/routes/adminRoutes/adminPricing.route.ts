import { BaseRoute } from "../base.route";
import { adminPricingPolicyController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AdminPricingRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/admin-pricing/agency",
      authenticate(["admin"]),
      asyncHandler(adminPricingPolicyController.getAdminAgencyPricing)
    );

    this.router.post(
      "/admin-pricing/agency",
      authenticate(["admin"]),
      asyncHandler(adminPricingPolicyController.createAdminAgencyPricing)
    );

    this.router.get(
      "/admin-pricing/traveler",
      authenticate(["admin"]),
      asyncHandler(adminPricingPolicyController.getAdminTravelerPricing)
    );

    this.router.post(
      "/admin-pricing/traveler",
      authenticate(["admin"]),
      asyncHandler(adminPricingPolicyController.createAdminTravelerPricing)
    );

  }
}