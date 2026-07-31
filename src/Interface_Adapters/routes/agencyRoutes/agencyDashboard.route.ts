import { Role } from "../../../Domain/Enums/Roles";
import { agencyDashboardController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "../base.route";


export class AgencyDashboardRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/dashboard", authenticate([Role.AGENCY]), asyncHandler(agencyDashboardController.getDashboard));
        this.router.get("/dashboard/sales-chart", authenticate([Role.AGENCY]), asyncHandler(agencyDashboardController.getSalesChart));
        this.router.get("/dashboard/sales-report", authenticate([Role.AGENCY]), asyncHandler(agencyDashboardController.getSalesReport));
        this.router.get("/dashboard/deliveries-chart", authenticate([Role.AGENCY]), asyncHandler(agencyDashboardController.getDeliveriesChart));
        this.router.get("/dashboard/sales-report/export", authenticate([Role.AGENCY]), asyncHandler(agencyDashboardController.exportSalesReport));

    }
}
