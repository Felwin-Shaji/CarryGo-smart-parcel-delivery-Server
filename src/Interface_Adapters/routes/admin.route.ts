import { adminAgencyController, adminHubController, adminPricingPolicyController, adminProfileController, adminUserController, adminWalletController } from "../../Infrastructure/di/resolver";
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
        this.router.patch("/agency/:id/kyc-status", authenticate(["admin"]), asyncHandler(adminAgencyController.updateAgencyKyc));
        this.router.patch("/agency/:id/status", authenticate(["admin"]), asyncHandler(adminAgencyController.updateAgencyStatus));
        this.router.get("/agency/hub/:id", authenticate(["admin"]), asyncHandler(adminHubController.getHubById));
        this.router.patch("/agency/hub/:id", authenticate(["admin"]), asyncHandler(adminHubController.updateHubKyc));



        this.router.get("/users", authenticate(["admin"]), asyncHandler(adminUserController.getUsers));
        this.router.get("/users/:id", authenticate(["admin"]), asyncHandler(adminUserController.getUserById));
        this.router.patch("/users/:id/status", authenticate(["admin"]), asyncHandler(adminUserController.UpdateStatus));
        this.router.patch("/users/:id/kyc-status", authenticate(["admin"]), asyncHandler(adminUserController.updateUserKyc));

        this.router.get("/admin-pricing/agency", authenticate(["admin"]), asyncHandler(adminPricingPolicyController.getAdminAgencyPricing));
        this.router.post("/admin-pricing/agency", authenticate(["admin"]), asyncHandler(adminPricingPolicyController.createAdminAgencyPricing));
        this.router.get("/admin-pricing/traveler", authenticate(["admin"]), asyncHandler(adminPricingPolicyController.getAdminTravelerPricing));
        this.router.post("/admin-pricing/traveler", authenticate(["admin"]), asyncHandler(adminPricingPolicyController.createAdminTravelerPricing));

        this.router.get('/wallet', authenticate(["admin"]), asyncHandler(adminWalletController.getAdminWalletOverview))
        this.router.post('/wallet/create-order', authenticate(["admin"]), asyncHandler(adminWalletController.createAddMoneyOrder))

    };
};