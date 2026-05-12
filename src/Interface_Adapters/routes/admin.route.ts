import { BaseRoute } from "./base.route";

import { AdminProfileRoute } from "./adminRoutes/adminProfile.route";
import { AdminAgencyRoute } from "./adminRoutes/adminAgency.route";
import { AdminUserRoute } from "./adminRoutes/adminUser.route";
import { AdminPricingRoute } from "./adminRoutes/adminPricing.route";
import { AdminWalletRoute } from "./adminRoutes/adminWallet.route";
import { NotificationRoute } from "./NotificationRoutes/notification.route";

export class AdminRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.use(new AdminProfileRoute().router);
    this.router.use(new AdminAgencyRoute().router);
    this.router.use(new AdminUserRoute().router);
    this.router.use(new AdminPricingRoute().router);
    this.router.use(new AdminWalletRoute().router);
    this.router.use(new NotificationRoute().router);
  }
}