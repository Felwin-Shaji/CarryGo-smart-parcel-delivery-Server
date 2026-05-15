import { BaseRoute } from "../base.route";
import { hubProfileController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";

export class HubProfileRoute extends BaseRoute {

    protected initializeRoutes(): void {

        this.router.get("/profile", authenticate([Role.HUB]), asyncHandler(hubProfileController.getHubProfile));

        this.router.put("/edit-profile", authenticate([Role.HUB]), asyncHandler(hubProfileController.editHubProfile));

        this.router.put("/reset-password", authenticate([Role.HUB]), asyncHandler(hubProfileController.resetHubPassword));

    }
}