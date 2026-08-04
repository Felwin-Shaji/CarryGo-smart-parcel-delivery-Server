import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { userTrackingController } from "../../../Infrastructure/DI/resolver";
import { Role } from "../../../Domain/Enums/Role";

export class TrackingRoute extends BaseRoute {

    protected initializeRoutes(): void {
        this.router.get("/tracking/:trackingId", authenticate([Role.USER]), asyncHandler(userTrackingController.getTrackingInfo));
    }
}