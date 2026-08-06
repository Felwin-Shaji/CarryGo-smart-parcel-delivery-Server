import { BaseRoute } from "../BaseRoute";
import { userController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { editUserProfileSchema, resetUserPasswordSchema } from "../../Validators/User/userValidator";

export class UserProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/profile", authenticate([Role.USER]), asyncHandler(userController.getUserProfile));

    this.router.patch("/edit-profile", validateRequest(editUserProfileSchema), authenticate([Role.USER]), asyncHandler(userController.updateUserProfile));

    this.router.patch("/reset-password", validateRequest(resetUserPasswordSchema), authenticate([Role.USER]), asyncHandler(userController.resetUserPassword));

  }
}