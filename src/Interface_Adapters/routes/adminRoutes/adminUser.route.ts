import { BaseRoute } from "../base.route";
import { adminUserController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AdminUserRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/users",
      authenticate(["admin"]),
      asyncHandler(adminUserController.getUsers)
    );

    this.router.get(
      "/users/:id",
      authenticate(["admin"]),
      asyncHandler(adminUserController.getUserById)
    );

    this.router.patch(
      "/users/:id/status",
      authenticate(["admin"]),
      asyncHandler(adminUserController.UpdateStatus)
    );

    this.router.patch(
      "/users/:id/kyc-status",
      authenticate(["admin"]),
      asyncHandler(adminUserController.updateUserKyc)
    );

  }
}