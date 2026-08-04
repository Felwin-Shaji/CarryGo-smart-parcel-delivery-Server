import { BaseRoute } from "./base.route"
import { HubDashboardRoute } from "./Hub/hubDashboard.route"
import { HubProfileRoute } from "./Hub/hubProfile.route"
import { HubShipmentRoute } from "./Hub/hubShipment.route"
import { HubWalletRoute } from "./Hub/hubWallet.route"
import { HubWorkerRoute } from "./Hub/hubWorker.route"
import { NotificationRoute } from "./Notification/notification.route"

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