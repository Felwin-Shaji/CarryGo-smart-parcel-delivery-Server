import { BaseRoute } from "../BaseRoute";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { workerProfileController } from "../../../Infrastructure/DI/resolver";

export class WorkerProfileRoute extends BaseRoute {

    protected initializeRoutes(): void {

        this.router.get("/profile", authenticate([Role.WORKER]), asyncHandler(workerProfileController.getWorkerProfile));

        this.router.put("/edit-profile", authenticate([Role.WORKER]), asyncHandler(workerProfileController.editWorkerProfile));

        this.router.put("/reset-password", authenticate([Role.WORKER]), asyncHandler(workerProfileController.resetWorkerPassword));

    }
}