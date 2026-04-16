import { BaseRoute } from "../base.route";
import { adminProfileController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";
import { resetAdminPasswordSchema, editAdminProfileSchema } from "@/Interface_Adapters/validators/AdminValidator/adminProfile.validator";
import { validateRequest } from "@/Interface_Adapters/middlewares/ValidationMiddleware/validateRequest";

export class AdminProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/profile", authenticate([Role.ADMIN]), asyncHandler(adminProfileController.getAdminProfile));

    this.router.put("/edit-profile", authenticate([Role.ADMIN]), validateRequest(editAdminProfileSchema), asyncHandler(adminProfileController.editAdminProfile));

    this.router.put("/reset-password", authenticate([Role.ADMIN]), validateRequest(resetAdminPasswordSchema), asyncHandler(adminProfileController.resetAdminPassword));

  }
}