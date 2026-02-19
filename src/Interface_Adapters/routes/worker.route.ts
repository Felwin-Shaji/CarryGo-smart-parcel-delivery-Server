// import { hubWalletController, hubWorkerController } from "../../Infrastructure/di/resolver"
import { workerWalletController } from "../../Infrastructure/di/resolver"
import { workerKYCUpload } from "../../Infrastructure/services/storage/multer"
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware"
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler"
import { BaseRoute } from "./base.route"

export class WrokerRoute extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoutes(): void {
        this.router.get('/wallet', authenticate(["worker"]), asyncHandler(workerWalletController.getWorkerWalletOverview))
        this.router.post('/wallet/create-order', authenticate(["worker"]), asyncHandler(workerWalletController.createAddMoneyOrder))
        this.router.post('/wallet/withdraw', authenticate(["worker"]), asyncHandler(workerWalletController.withdrawMoney))
    }
}