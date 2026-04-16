import { BaseRoute } from "../base.route";
import { agencyProfileController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";

export class AgencyProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/profile",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyProfileController.getAgencyProfile)
    );

    this.router.put(
      "/edit-profile",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyProfileController.editAgencyProfile)
    );

    this.router.put(
      "/reset-password",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyProfileController.resetAgencyPassword)
    );

  }
}