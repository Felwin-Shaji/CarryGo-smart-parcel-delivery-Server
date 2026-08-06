// import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
// import { BaseRoute } from "../base.route";
// import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
// import { workerShipmentController } from "@/Infrastructure/di/resolver";
// import { Role } from "@/Domain/Enums/Roles";
// import { validateRequest } from "@/Interface_Adapters/middlewares/ValidationMiddleware/validateRequest";
// import { bulkUpdateParcelsSchema, updateShipmentStatusSchema } from "@/Interface_Adapters/validators/WorkerValidator/workerShipment.validator";

import { Role } from "../../../Domain/Enums/Role";
import { workerShipmentController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { bulkUpdateParcelsSchema, updateShipmentStatusSchema } from "../../Validators/Worker/workerShipmentValidator";
import { BaseRoute } from "../BaseRoute";

export class WorkerShipmentRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/shipments", authenticate([Role.WORKER]), asyncHandler(workerShipmentController.getWorkerShipments));
        this.router.get("/shipments/:id", authenticate([Role.WORKER]), asyncHandler(workerShipmentController.getWorkerShipmentDetails));
        this.router.get("/shipments/:id/booking-details", authenticate([Role.WORKER]), asyncHandler(workerShipmentController.getBookingDetails));

        this.router.patch("/shipments/:id/status", authenticate([Role.WORKER]), validateRequest(updateShipmentStatusSchema), asyncHandler(workerShipmentController.updateShipmentStatus));
        this.router.patch("/shipments/:id/parcels/bulk", authenticate([Role.WORKER]), validateRequest(bulkUpdateParcelsSchema), asyncHandler(workerShipmentController.bulkUpdateParcels));
    }
}