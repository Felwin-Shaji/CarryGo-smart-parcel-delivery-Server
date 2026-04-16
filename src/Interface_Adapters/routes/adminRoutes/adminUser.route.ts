import { BaseRoute } from "../base.route";
import { adminUserController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";

export class AdminUserRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/users",
      authenticate([Role.ADMIN]),
      asyncHandler(adminUserController.getUsers)
    );

    this.router.get(
      "/users/:id",
      authenticate([Role.ADMIN]),
      asyncHandler(adminUserController.getUserById)
    );

    this.router.patch(
      "/users/:id/status",
      authenticate([Role.ADMIN]),
      asyncHandler(adminUserController.UpdateStatus)
    );

    this.router.patch(
      "/users/:id/kyc-status",
      authenticate([Role.ADMIN]),
      asyncHandler(adminUserController.updateUserKyc)
    );

  }
}