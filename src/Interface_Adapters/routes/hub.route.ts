import { BaseRoute } from "./base.route"
import { HubDashboardRoute } from "./hubRoutes/hubDashboard.route"
import { HubProfileRoute } from "./hubRoutes/hubProfile.route"
import { HubShipmentRoute } from "./hubRoutes/hubShipment.route"
import { HubWalletRoute } from "./hubRoutes/hubWallet.route"
import { HubWorkerRoute } from "./hubRoutes/hubWorker.route"
import { NotificationRoute } from "./NotificationRoutes/notification.route"

export class HubRoute extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoutes(): void {
        this.router.use(new HubWorkerRoute().router);
        this.router.use(new HubWalletRoute().router);
        this.router.use(new HubShipmentRoute().router);
        this.router.use(new HubProfileRoute().router);
        this.router.use(new HubDashboardRoute().router);
        this.router.use(new NotificationRoute().router);
    }
}