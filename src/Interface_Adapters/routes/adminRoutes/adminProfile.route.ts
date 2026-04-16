import { BaseRoute } from "../base.route";
import { adminProfileController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";

export class AdminProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/profile",
      authenticate([Role.ADMIN]),
      asyncHandler(adminProfileController.getAdminProfile)
    );

    this.router.put(
      "/edit-profile",
      authenticate([Role.ADMIN]),
      asyncHandler(adminProfileController.editAdminProfile)
    );

    this.router.put(
      "/reset-password",
      authenticate([Role.ADMIN]),
      asyncHandler(adminProfileController.resetAdminPassword)
    );

  }
}