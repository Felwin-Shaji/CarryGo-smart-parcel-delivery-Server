import { BaseRoute } from "./base.route"
import { HubProfileRoute } from "./hubRoutes/hubProfile.route"
import { HubShipmentRoute } from "./hubRoutes/hubShipment.route"
import { HubWalletRoute } from "./hubRoutes/hubWallet.route"
import { HubWorkerRoute } from "./hubRoutes/hubWorker.route"

export class HubRoute extends BaseRoute {
    constructor() {
        super() 
    }

    protected initializeRoutes(): void {
        this.router.use(new HubWorkerRoute().router);
        this.router.use(new HubWalletRoute().router);
        this.router.use(new HubShipmentRoute().router);
        this.router.use(new HubProfileRoute().router);
    }
}