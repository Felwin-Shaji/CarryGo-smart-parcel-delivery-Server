import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { hubShipmentController } from "@/Infrastructure/di/resolver";

export class HubShipmentRoute extends BaseRoute {

    protected initializeRoutes(): void {
        this.router.get("/shipments", authenticate(["hub"]), asyncHandler(hubShipmentController.getShipmentById));
        this.router.get("/shipments/:id", authenticate(["hub"]), asyncHandler(hubShipmentController.getShipmentDetails));
    }
}