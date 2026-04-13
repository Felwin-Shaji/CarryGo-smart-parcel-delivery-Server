import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { userTrackingController } from "@/Infrastructure/di/resolver";

export class TrackingRoute extends BaseRoute {

    protected initializeRoutes(): void {
        this.router.get("/tracking/:trackingId", authenticate(["user"]), asyncHandler(userTrackingController.getTrackingInfo));
    }
}