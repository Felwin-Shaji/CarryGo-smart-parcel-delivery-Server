import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { agencyHubWorkerController } from "@/Infrastructure/di/resolver";
import { Role } from "@/Domain/Enums/Roles";

export class AgencyHubWorkerRoute extends BaseRoute {
    protected initializeRoutes(): void {

        this.router.get("/hubs/worker/:id", authenticate([Role.AGENCY]), asyncHandler(agencyHubWorkerController.getHubWorkerById))
        this.router.patch("/hubs/worker/:id/kyc-status", authenticate([Role.AGENCY]), asyncHandler(agencyHubWorkerController.updateWorkerKycStatus))
    }
}