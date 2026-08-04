import { agencyHubWorkerController, workerDashboardController } from "../../../Infrastructure/DI/resolver"
import { BaseRoute } from "../base.route"
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler"
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware"
import { Role } from "../../../Domain/Enums/Role"


export class AgencyHubWorkerRoute extends BaseRoute {
    protected initializeRoutes(): void {

        this.router.get("/hubs/worker/:id", authenticate([Role.AGENCY]), asyncHandler(agencyHubWorkerController.getHubWorkerById))
        this.router.patch("/hubs/worker/:id/kyc-status", authenticate([Role.AGENCY]), asyncHandler(agencyHubWorkerController.updateWorkerKycStatus))

        this.router.get("/hub/worker/parcels/:workerId", authenticate([Role.AGENCY]), asyncHandler(workerDashboardController.getWorkerParcelsByWorkerId));
        this.router.get("/hub/worker/dashboard/:workerId", authenticate([Role.AGENCY]), asyncHandler(workerDashboardController.getWorkerDashboardByWorkerId));
        this.router.get("/hub/worker/analytics/graph/:workerId", authenticate([Role.AGENCY]), asyncHandler(workerDashboardController.getWorkerGraphByWorkerId));
    }
}