import { Role } from "@/Domain/Enums/Roles";
import { BaseRoute } from "../base.route";
import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { hubDashboardController } from "@/Infrastructure/di/resolver";

export class HubDashboardRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/dashboard/summary", authenticate([Role.HUB]), asyncHandler(hubDashboardController.getSummary))
        this.router.get("/dashboard/trend", authenticate([Role.HUB]), asyncHandler(hubDashboardController.getTrend))
        this.router.get("/dashboard/types", authenticate([Role.HUB]), asyncHandler(hubDashboardController.getTypes))
        this.router.get("/dashboard/shipments-preview", authenticate([Role.HUB]), asyncHandler(hubDashboardController.getShipmentsPreview))

        this.router.get("/dashboard/summary/:hubId", authenticate([Role.HUB, Role.AGENCY, Role.ADMIN]), asyncHandler(hubDashboardController.getSummary))
        this.router.get("/dashboard/trend/:hubId", authenticate([Role.HUB, Role.AGENCY, Role.ADMIN]), asyncHandler(hubDashboardController.getTrend))
        this.router.get("/dashboard/types/:hubId", authenticate([Role.HUB, Role.AGENCY, Role.ADMIN]), asyncHandler(hubDashboardController.getTypes))
        this.router.get("/dashboard/shipments-preview/:hubId", authenticate([Role.HUB, Role.AGENCY, Role.ADMIN]), asyncHandler(hubDashboardController.getShipmentsPreview))
    };
}