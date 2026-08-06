import { BaseRoute } from "../BaseRoute";
import { adminProfileController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { editAdminProfileSchema, resetAdminPasswordSchema } from "../../Validators/Admin/adminProfileValidator";

export class AdminProfileRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/profile", authenticate([Role.ADMIN]), asyncHandler(adminProfileController.getAdminProfile));

    this.router.put("/edit-profile", authenticate([Role.ADMIN]), validateRequest(editAdminProfileSchema), asyncHandler(adminProfileController.editAdminProfile));

    this.router.put("/reset-password", authenticate([Role.ADMIN]), validateRequest(resetAdminPasswordSchema), asyncHandler(adminProfileController.resetAdminPassword));

  }
}