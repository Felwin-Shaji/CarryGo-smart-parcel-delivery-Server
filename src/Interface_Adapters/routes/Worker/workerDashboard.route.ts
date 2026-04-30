import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";
import { Role } from "@/Domain/Enums/Roles";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { workerDashboardController } from "@/Infrastructure/di/resolver";

export class WrokerDashboardRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/parcels", authenticate([Role.WORKER]), asyncHandler(workerDashboardController.workerParcels));
        this.router.get("/dashboard", authenticate([Role.WORKER]), asyncHandler(workerDashboardController.getWorkerDashboard));
        this.router.get("/analytics/graph", authenticate([Role.WORKER]), asyncHandler(workerDashboardController.getWorkerGraph));
    }
}