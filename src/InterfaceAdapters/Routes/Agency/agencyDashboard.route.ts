import { Role } from "../../../Domain/Enums/Role";
import { agencyDashboardController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
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
