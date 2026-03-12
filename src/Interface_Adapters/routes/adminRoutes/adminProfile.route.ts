import { BaseRoute } from "../base.route";
import { adminProfileController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AdminProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/profile",
      authenticate(["admin"]),
      asyncHandler(adminProfileController.getAdminProfile)
    );

    this.router.put(
      "/edit-profile",
      authenticate(["admin"]),
      asyncHandler(adminProfileController.editAdminProfile)
    );

    this.router.put(
      "/reset-password",
      authenticate(["admin"]),
      asyncHandler(adminProfileController.resetAdminPassword)
    );

  }
}