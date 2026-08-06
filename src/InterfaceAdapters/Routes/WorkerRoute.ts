import { Role } from "../../Domain/Enums/Role"
import { workerWalletController } from "../../Infrastructure/DI/resolver"
import { authenticate } from "../Middlewares/AuthMiddleware/authenticate"
import { asyncHandler } from "../Middlewares/ErrorHandlers/asyncHandler"
import { BaseRoute } from "./BaseRoute"
import { WorkerShipmentRoute } from "./Worker/WorkerShipmentRoute"
import { WrokerDashboardRoute } from "./Worker/WorkerDashboardRoute"
import { NotificationRoute } from "./Notification/NotificationRoute"
import { WorkerProfileRoute } from "./Worker/WorkerProfileRoute"

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
        this.router.use(new WorkerProfileRoute().router);
    }
}