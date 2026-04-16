import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { userTrackingController } from "@/Infrastructure/di/resolver";
import { Role } from "@/Domain/Enums/Roles";

export class TrackingRoute extends BaseRoute {

    protected initializeRoutes(): void {
        this.router.get("/tracking/:trackingId", authenticate([Role.USER]), asyncHandler(userTrackingController.getTrackingInfo));
    }
}