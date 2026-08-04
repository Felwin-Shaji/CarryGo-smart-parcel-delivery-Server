import { Role } from "../../../Domain/Enums/Role";
import { adminDashboardController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
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