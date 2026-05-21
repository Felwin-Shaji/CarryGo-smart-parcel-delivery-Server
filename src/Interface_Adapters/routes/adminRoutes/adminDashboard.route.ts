import { Role } from "../../../Domain/Enums/Roles";
import { adminDashboardController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "../base.route";

export class AdminDashboardRote extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/dashboard", authenticate([Role.ADMIN]), asyncHandler(adminDashboardController.getDashboardOverview));

        this.router.get("/revenue-chart", authenticate([Role.ADMIN]), asyncHandler(adminDashboardController.getRevenueChart));

        this.router.get("/bookings-chart", authenticate([Role.ADMIN]), asyncHandler(adminDashboardController.getBookingsChart));

        this.router.get("/bookings-report", authenticate([Role.ADMIN]), asyncHandler(adminDashboardController.getBookingsReport));

        this.router.get("/bookings-report/export", authenticate([Role.ADMIN]), asyncHandler(adminDashboardController.exportBookingsReport));
    }
}