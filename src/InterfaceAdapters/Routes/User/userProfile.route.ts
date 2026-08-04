import { BaseRoute } from "../base.route";
import { userController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { editUserProfileSchema, resetUserPasswordSchema } from "../../Validators/User/user.validator";

export class UserProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/profile", authenticate([Role.USER]), asyncHandler(userController.getUserProfile));

    this.router.patch("/edit-profile", validateRequest(editUserProfileSchema), authenticate([Role.USER]), asyncHandler(userController.updateUserProfile));

    this.router.patch("/reset-password", validateRequest(resetUserPasswordSchema), authenticate([Role.USER]), asyncHandler(userController.resetUserPassword));

  }
}