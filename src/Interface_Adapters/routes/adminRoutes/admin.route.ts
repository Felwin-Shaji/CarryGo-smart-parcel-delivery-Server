import { BaseRoute } from "../base.route";

import { AdminProfileRoute } from "./adminProfile.route";
import { AdminAgencyRoute } from "./adminAgency.route";
import { AdminUserRoute } from "./adminUser.route";
import { AdminPricingRoute } from "./adminPricing.route";
import { AdminWalletRoute } from "./adminWallet.route";
import { NotificationRoute } from "../NotificationRoutes/notification.route";
import { AdminDashboardRote } from "./adminDashboard.route";

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