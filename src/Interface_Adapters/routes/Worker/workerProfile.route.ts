import { BaseRoute } from "../base.route";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { workerProfileController } from "../../../Infrastructure/di/resolver";

export class WorkerProfileRoute extends BaseRoute {

    protected initializeRoutes(): void {

        this.router.get("/profile", authenticate([Role.WORKER]), asyncHandler(workerProfileController.getWorkerProfile));

        this.router.put("/edit-profile", authenticate([Role.WORKER]), asyncHandler(workerProfileController.editWorkerProfile));

        this.router.put("/reset-password", authenticate([Role.WORKER]), asyncHandler(workerProfileController.resetWorkerPassword));

    }
}