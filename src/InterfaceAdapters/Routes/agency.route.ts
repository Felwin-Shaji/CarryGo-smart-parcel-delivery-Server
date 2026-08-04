import { BaseRoute } from "./base.route";
import { AgencyKycRoute } from "./Agency/agencyKyc.route";
import { AgencyProfileRoute } from "./Agency/agencyProfile.route";
import { AgencyPricingRoute } from "./Agency/agencyPricing.route";
import { AgencyHubRoute } from "./Agency/agencyHub.route";
import { AgencyWalletRoute } from "./Agency/agencyWallet.route";
import { AgencyRouteGroupRoute } from "./Agency/agencyRoute.route";
import { AgencyRouteSegmentRoute } from "./Agency/agencyRouteSegment.route";
import { AgencyHubWorkerRoute } from "./Agency/agencyHubWorker.route";
import { AgencyDashboardRoute } from "./Agency/agencyDashboard.route";
import { NotificationRoute } from "./Notification/notification.route";

export class AgencyRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.use(new AgencyKycRoute().router);
    this.router.use(new AgencyProfileRoute().router);
    this.router.use(new AgencyPricingRoute().router);
    this.router.use(new AgencyHubRoute().router);
    this.router.use(new AgencyWalletRoute().router);
    this.router.use(new AgencyRouteGroupRoute().router);
    this.router.use(new AgencyRouteSegmentRoute().router);
    this.router.use(new AgencyHubWorkerRoute().router);
    this.router.use(new AgencyDashboardRoute().router);
    this.router.use(new NotificationRoute().router);
  }
}