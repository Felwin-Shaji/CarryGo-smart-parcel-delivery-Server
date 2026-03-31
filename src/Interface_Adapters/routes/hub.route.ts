import { hubWalletController, hubWorkerController } from "../../Infrastructure/di/resolver"
import { workerKYCUpload } from "../../Infrastructure/services/storage/multer"
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware"
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler"
import { BaseRoute } from "./base.route"
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
    }
}