import { Role } from "@/Domain/Enums/Roles"
import { workerWalletController } from "../../Infrastructure/di/resolver"
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware"
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler"
import { BaseRoute } from "./base.route"
import { WorkerShipmentRoute } from "./Worker/workerShipment.route"
import { WrokerDashboardRoute } from "./Worker/workerDashboard.route"
import { NotificationRoute } from "./NotificationRoutes/notification.route"

export class WrokerRoute extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoutes(): void {
        this.router.get('/wallet', authenticate([Role.WORKER]), asyncHandler(workerWalletController.getWorkerWalletOverview))
        this.router.post('/wallet/create-order', authenticate([Role.WORKER]), asyncHandler(workerWalletController.createAddMoneyOrder))
        this.router.post('/wallet/withdraw', authenticate([Role.WORKER]), asyncHandler(workerWalletController.withdrawMoney))

        this.router.use(new WorkerShipmentRoute().router);
        this.router.use(new WrokerDashboardRoute().router);
        this.router.use(new NotificationRoute().router);
    }
}