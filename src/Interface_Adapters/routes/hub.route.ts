import { hubWalletController, hubWorkerController } from "../../Infrastructure/di/resolver"
import { workerKYCUpload } from "../../Infrastructure/services/storage/multer"
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware"
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler"
import { BaseRoute } from "./base.route"

export class HubRoute extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/worker/temp-register", authenticate(["hub"]), asyncHandler(hubWorkerController.addNewWorker));
        this.router.post("/worker/verify-otp", authenticate(["hub"]), asyncHandler(hubWorkerController.verifyWorkerOtp));
        this.router.post("/worker/kyc-upload", authenticate(["hub"]), workerKYCUpload, asyncHandler(hubWorkerController.uploadWorkerKYC));

        this.router.get("/workers", authenticate(["hub"]), workerKYCUpload, asyncHandler(hubWorkerController.getHubWorkers));

        this.router.get('/wallet', authenticate(["hub"]), asyncHandler(hubWalletController.getHubWalletOverview))
        this.router.post('/wallet/create-order', authenticate(["hub"]), asyncHandler(hubWalletController.createAddMoneyOrder))
        this.router.post('/wallet/withdraw', authenticate(["hub"]), asyncHandler(hubWalletController.withdrawMoney))
        
    }
}