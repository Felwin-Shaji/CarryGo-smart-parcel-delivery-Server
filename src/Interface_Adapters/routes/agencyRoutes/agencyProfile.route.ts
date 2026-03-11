import { BaseRoute } from "../base.route";
import { agencyProfileController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AgencyProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/profile",
      authenticate(["agency"]),
      asyncHandler(agencyProfileController.getAgencyProfile)
    );

    this.router.put(
      "/edit-profile",
      authenticate(["agency"]),
      asyncHandler(agencyProfileController.editAgencyProfile)
    );

    this.router.put(
      "/reset-password",
      authenticate(["agency"]),
      asyncHandler(agencyProfileController.resetAgencyPassword)
    );

  }
}