import { BaseRoute } from "../base.route";
import { adminAgencyController, adminHubController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AdminAgencyRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/agency",
      authenticate(["admin"]),
      asyncHandler(adminAgencyController.getAgencies)
    );

    this.router.get(
      "/agency/:id",
      authenticate(["admin"]),
      asyncHandler(adminAgencyController.getAgencyById)
    );

    this.router.patch(
      "/agency/:id/kyc-status",
      authenticate(["admin"]),
      asyncHandler(adminAgencyController.updateAgencyKyc)
    );

    this.router.patch(
      "/agency/:id/status",
      authenticate(["admin"]),
      asyncHandler(adminAgencyController.updateAgencyStatus)
    );

    this.router.get(
      "/agency/hub/:id",
      authenticate(["admin"]),
      asyncHandler(adminHubController.getHubById)
    );

    this.router.patch(
      "/agency/hub/:id",
      authenticate(["admin"]),
      asyncHandler(adminHubController.updateHubKyc)
    );

  }
}