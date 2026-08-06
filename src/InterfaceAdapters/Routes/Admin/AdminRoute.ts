import { BaseRoute } from "../BaseRoute";

import { AdminProfileRoute } from "./AdminProfileRoute";
import { AdminAgencyRoute } from "./AdminAgencyRoute";
import { AdminUserRoute } from "./AdminUserRoute";
import { AdminPricingRoute } from "./AdminPricingRoute";
import { AdminWalletRoute } from "./AdminWalletRoute";
import { NotificationRoute } from "../Notification/NotificationRoute";
import { AdminDashboardRote } from "./AdminDashboardRoute";

export class AdminRoute extends BaseRoute {

  protected initializeRoutes(): void {
    this.router.use(new AdminDashboardRote().router)
    this.router.use(new AdminProfileRoute().router);
    this.router.use(new AdminAgencyRoute().router);
    this.router.use(new AdminUserRoute().router);
    this.router.use(new AdminPricingRoute().router);
    this.router.use(new AdminWalletRoute().router);
    this.router.use(new NotificationRoute().router);
  }
}