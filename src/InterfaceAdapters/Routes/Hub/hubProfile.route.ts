import { BaseRoute } from "../base.route";
import { hubProfileController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";

export class HubProfileRoute extends BaseRoute {

    protected initializeRoutes(): void {

        this.router.get("/profile", authenticate([Role.HUB]), asyncHandler(hubProfileController.getHubProfile));

        this.router.put("/edit-profile", authenticate([Role.HUB]), asyncHandler(hubProfileController.editHubProfile));

        this.router.put("/reset-password", authenticate([Role.HUB]), asyncHandler(hubProfileController.resetHubPassword));

    }
}