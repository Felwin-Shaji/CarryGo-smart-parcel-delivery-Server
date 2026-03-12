import { BaseRoute } from "./base.route";
import { AgencyKycRoute } from "./agencyRoutes/agencyKyc.route";
import { AgencyProfileRoute } from "./agencyRoutes/agencyProfile.route";
import { AgencyPricingRoute } from "./agencyRoutes/agencyPricing.route";
import { AgencyHubRoute } from "./agencyRoutes/agencyHub.route";
import { AgencyWalletRoute } from "./agencyRoutes/agencyWallet.route";

export class AgencyRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.use(new AgencyKycRoute().router);
    this.router.use(new AgencyProfileRoute().router);
    this.router.use(new AgencyPricingRoute().router);
    this.router.use(new AgencyHubRoute().router);
    this.router.use(new AgencyWalletRoute().router);

  }
}