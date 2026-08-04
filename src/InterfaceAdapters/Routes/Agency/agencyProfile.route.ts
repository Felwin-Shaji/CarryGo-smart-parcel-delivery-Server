import { BaseRoute } from "../base.route";
import { agencyProfileController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";

export class AgencyProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/profile", authenticate([Role.AGENCY]), asyncHandler(agencyProfileController.getAgencyProfile));

    this.router.put("/edit-profile", authenticate([Role.AGENCY]), asyncHandler(agencyProfileController.editAgencyProfile));

    this.router.put("/reset-password", authenticate([Role.AGENCY]), asyncHandler(agencyProfileController.resetAgencyPassword));

  }
}