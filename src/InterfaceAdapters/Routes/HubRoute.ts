import { BaseRoute } from "./BaseRoute"
import { HubDashboardRoute } from "./Hub/HubDashboardRoute"
import { HubProfileRoute } from "./Hub/HubProfileRoute"
import { HubShipmentRoute } from "./Hub/HubShipmentRoute"
import { HubWalletRoute } from "./Hub/HubWalletRoute"
import { HubWorkerRoute } from "./Hub/HubWorkerRoute"
import { NotificationRoute } from "./Notification/NotificationRoute"

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