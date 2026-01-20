import { adminAgencyController, adminHubController, adminPricingPolicyController, adminProfileController, adminUserController} from "../../Infrastructure/di/resolver";
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "./base.route";

export class AdminRoute extends BaseRoute {
    constructor() {
        super()
    };

    protected initializeRoutes(): void {
        this.router.get("/profile", authenticate(["admin"]), asyncHandler(adminProfileController.getAdminProfile));
        this.router.put("/edit-profile", authenticate(["admin"]), asyncHandler(adminProfileController.editAdminProfile));
        this.router.put("/reset-password", authenticate(["admin"]), asyncHandler(adminProfileController.resetAdminPassword));


        this.router.get("/agency", authenticate(["admin"]), asyncHandler(adminAgencyController.getAgencies));
        this.router.get("/agency/:id", authenticate(["admin"]), asyncHandler(adminAgencyController.getAgencyById));
        this.router.patch("/agency/:id/kyc-status", authenticate(["admin"]),asyncHandler(adminAgencyController.updateAgencyKyc));
        this.router.patch("/agency/:id/status", authenticate(["admin"]),asyncHandler(adminAgencyController.updateAgencyStatus));
        this.router.get("/agency/hub/:id", authenticate(["admin"]),asyncHandler(adminHubController.getHubById));
        this.router.patch("/agency/hub/:id", authenticate(["admin"]),asyncHandler(adminHubController.updateHubKyc));



        this.router.get("/users", authenticate(["admin"]), asyncHandler(adminUserController.getUsers));
        this.router.patch("/users/:id/status", authenticate(["admin"]), asyncHandler(adminUserController.UpdateStatus));

        this.router.get("/admin-pricing",authenticate(["admin"]),asyncHandler(adminPricingPolicyController.getAdminPricing));
        this.router.post("/admin-pricing",authenticate(["admin"]),asyncHandler(adminPricingPolicyController.createAdminPricing));
    };
};