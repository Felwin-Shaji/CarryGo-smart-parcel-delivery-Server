import { Role } from "../../../Domain/Enums/Role"
import { BaseRoute } from "../BaseRoute"
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate"
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler"
import { hubDashboardController } from "../../../Infrastructure/DI/resolver"

export class HubDashboardRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/dashboard/summary", authenticate([Role.HUB]), asyncHandler(hubDashboardController.getSummary))
        this.router.get("/dashboard/trend", authenticate([Role.HUB]), asyncHandler(hubDashboardController.getTrend))
        this.router.get("/dashboard/types", authenticate([Role.HUB]), asyncHandler(hubDashboardController.getTypes))
        this.router.get("/dashboard/shipments-preview", authenticate([Role.HUB]), asyncHandler(hubDashboardController.getShipmentsPreview))
    };
}