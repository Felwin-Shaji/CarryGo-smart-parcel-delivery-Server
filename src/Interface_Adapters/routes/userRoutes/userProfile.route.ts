import { BaseRoute } from "../base.route";
import { userController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";
import { validateRequest } from "@/Interface_Adapters/middlewares/ValidationMiddleware/validateRequest";
import { editUserProfileSchema, resetUserPasswordSchema } from "@/Interface_Adapters/validators/UserValidator/user.validator";

export class UserProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/profile", authenticate([Role.USER]), asyncHandler(userController.getUserProfile));

    this.router.patch("/edit-profile", validateRequest(editUserProfileSchema), authenticate([Role.USER]), asyncHandler(userController.updateUserProfile));

    this.router.patch("/reset-password", validateRequest(resetUserPasswordSchema), authenticate([Role.USER]), asyncHandler(userController.resetUserPassword));

  }
}