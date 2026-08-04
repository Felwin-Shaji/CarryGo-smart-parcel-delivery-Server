import { Role } from "../../Domain/Enums/Roles"
import { workerWalletController } from "../../Infrastructure/DI/resolver"
import { authenticate } from "../Middlewares/AuthMiddleware/authenticate.middleware"
import { asyncHandler } from "../Middlewares/ErrorHandlers/asyncHandler"
import { BaseRoute } from "./base.route"
import { WorkerShipmentRoute } from "./Worker/workerShipment.route"
import { WrokerDashboardRoute } from "./Worker/workerDashboard.route"
import { NotificationRoute } from "./Notification/notification.route"
import { WorkerProfileRoute } from "./Worker/workerProfile.route"

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