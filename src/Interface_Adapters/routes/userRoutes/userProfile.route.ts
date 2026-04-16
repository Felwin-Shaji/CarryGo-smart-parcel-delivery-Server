import { BaseRoute } from "../base.route";
import { userController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";

export class UserProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/profile",
      authenticate([Role.USER]),
      asyncHandler(userController.getUserProfile)
    );

    this.router.patch(
      "/edit-profile",
      authenticate([Role.USER]),
      asyncHandler(userController.updateUserProfile)
    );

    this.router.patch(
      "/reset-password",
      authenticate([Role.USER]),
      asyncHandler(userController.resetUserPassword)
    );

  }
}