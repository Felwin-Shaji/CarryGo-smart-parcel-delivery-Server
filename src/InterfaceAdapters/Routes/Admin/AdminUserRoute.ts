import { BaseRoute } from "../BaseRoute";
import { adminUserController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { updateUserKycSchema } from "../../Validators/Admin/adminUserValidator";

export class AdminUserRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/users", authenticate([Role.ADMIN]), asyncHandler(adminUserController.getUsers));

    this.router.get("/users/:id", authenticate([Role.ADMIN]), asyncHandler(adminUserController.getUserById));

    this.router.patch("/users/:id/status", authenticate([Role.ADMIN]), asyncHandler(adminUserController.UpdateStatus));

    this.router.patch("/users/:id/kyc-status", authenticate([Role.ADMIN]), validateRequest(updateUserKycSchema), asyncHandler(adminUserController.updateUserKyc));

  }
}