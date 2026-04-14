import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { workerShipmentController } from "@/Infrastructure/di/resolver";

export class WorkerShipmentRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/shipments", authenticate(["worker"]), asyncHandler(workerShipmentController.getWorkerShipments));
        this.router.get("/shipments/:id", authenticate(["worker"]), asyncHandler(workerShipmentController.getWorkerShipmentDetails));
        this.router.get("/shipments/:id/booking-details", authenticate(["worker"]), asyncHandler(workerShipmentController.getBookingDetails));
        this.router.patch("/shipments/:id/status", authenticate(["worker"]), asyncHandler(workerShipmentController.updateShipmentStatus));
        this.router.patch("/shipments/:id/parcels/bulk", authenticate(["worker"]), asyncHandler(workerShipmentController.bulkUpdateParcels));
    }
}