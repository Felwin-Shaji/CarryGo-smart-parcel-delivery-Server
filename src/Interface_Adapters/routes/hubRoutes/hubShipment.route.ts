import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { hubShipmentController } from "@/Infrastructure/di/resolver";
import { Role } from "@/Domain/Enums/Roles";

export class HubShipmentRoute extends BaseRoute {

    protected initializeRoutes(): void {
        this.router.get("/shipments", authenticate([Role.HUB]), asyncHandler(hubShipmentController.getShipmentById));
        this.router.get("/shipments/:id", authenticate([Role.HUB]), asyncHandler(hubShipmentController.getShipmentDetails));
        this.router.patch("/shipments/:id", authenticate([Role.HUB]), asyncHandler(hubShipmentController.updateShipmentDetails));
    }
}