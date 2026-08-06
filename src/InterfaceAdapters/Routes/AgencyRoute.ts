import { BaseRoute } from "./BaseRoute";
import { AgencyKycRoute } from "./Agency/AgencyKYCRoute";
import { AgencyProfileRoute } from "./Agency/AgencyProfileRoute";
import { AgencyPricingRoute } from "./Agency/AgencyPricingRoute";
import { AgencyHubRoute } from "./Agency/AgencyHubRoute";
import { AgencyWalletRoute } from "./Agency/AgencyWalletRoute";
import { AgencyRouteGroupRoute } from "./Agency/AgencyRouteGroupRoute";
import { AgencyRouteSegmentRoute } from "./Agency/AgencyRouteSegmentRoute";
import { AgencyHubWorkerRoute } from "./Agency/AgencyHubWorkerRoute";
import { AgencyDashboardRoute } from "./Agency/AgencyDashboardRoute";
import { NotificationRoute } from "./Notification/NotificationRoute";

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