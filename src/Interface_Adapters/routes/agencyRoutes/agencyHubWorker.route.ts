import { agencyHubWorkerController } from "../../../Infrastructure/di/resolver"
import { BaseRoute } from "../base.route"
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler"
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware"
import { Role } from "../../../Domain/Enums/Roles"


export class AgencyHubWorkerRoute extends BaseRoute {
    protected initializeRoutes(): void {

        this.router.get("/hubs/worker/:id", authenticate([Role.AGENCY]), asyncHandler(agencyHubWorkerController.getHubWorkerById))
        this.router.patch("/hubs/worker/:id/kyc-status", authenticate([Role.AGENCY]), asyncHandler(agencyHubWorkerController.updateWorkerKycStatus))
    }
}