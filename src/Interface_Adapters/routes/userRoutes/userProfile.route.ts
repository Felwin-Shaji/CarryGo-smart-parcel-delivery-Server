import { BaseRoute } from "../base.route";
import { userController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class UserProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/profile",
      authenticate(["user"]),
      asyncHandler(userController.getUserProfile)
    );

    this.router.patch(
      "/edit-profile",
      authenticate(["user"]),
      asyncHandler(userController.updateUserProfile)
    );

    this.router.patch(
      "/reset-password",
      authenticate(["user"]),
      asyncHandler(userController.resetUserPassword)
    );

  }
}