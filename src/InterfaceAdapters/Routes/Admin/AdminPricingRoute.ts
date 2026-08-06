import { BaseRoute } from "../BaseRoute";
import { adminPricingPolicyController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { adminAgencyPricingSchema, adminTravelerPricingSchema } from "../../Validators/Admin/adminPricingValidator";

export class AdminPricingRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/admin-pricing/agency", authenticate([Role.ADMIN]), asyncHandler(adminPricingPolicyController.getAdminAgencyPricing));

    this.router.post("/admin-pricing/agency", authenticate([Role.ADMIN]), validateRequest(adminAgencyPricingSchema), asyncHandler(adminPricingPolicyController.createAdminAgencyPricing));

    this.router.get("/admin-pricing/traveler", authenticate([Role.ADMIN]), asyncHandler(adminPricingPolicyController.getAdminTravelerPricing));

    this.router.post("/admin-pricing/traveler", authenticate([Role.ADMIN]), validateRequest(adminTravelerPricingSchema), asyncHandler(adminPricingPolicyController.createAdminTravelerPricing));

  }
}