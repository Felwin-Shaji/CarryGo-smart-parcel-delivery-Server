import { BaseRoute } from "../base.route";
import { adminPricingPolicyController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { validateRequest } from "../../middlewares/ValidationMiddleware/validateRequest";
import { adminAgencyPricingSchema, adminTravelerPricingSchema } from "../../validators/AdminValidator/adminPricing.validator";

export class AdminPricingRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/admin-pricing/agency", authenticate([Role.ADMIN]), asyncHandler(adminPricingPolicyController.getAdminAgencyPricing));

    this.router.post("/admin-pricing/agency", authenticate([Role.ADMIN]), validateRequest(adminAgencyPricingSchema), asyncHandler(adminPricingPolicyController.createAdminAgencyPricing));

    this.router.get("/admin-pricing/traveler", authenticate([Role.ADMIN]), asyncHandler(adminPricingPolicyController.getAdminTravelerPricing));

    this.router.post("/admin-pricing/traveler", authenticate([Role.ADMIN]), validateRequest(adminTravelerPricingSchema), asyncHandler(adminPricingPolicyController.createAdminTravelerPricing));

  }
}