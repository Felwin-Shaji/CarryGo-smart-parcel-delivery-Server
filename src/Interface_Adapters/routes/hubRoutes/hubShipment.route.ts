import { Role } from "../../../Domain/Enums/Roles";
import { hubShipmentController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "../base.route";

export class HubShipmentRoute extends BaseRoute {

    protected initializeRoutes(): void {
        this.router.get("/shipments", authenticate([Role.HUB]), asyncHandler(hubShipmentController.getShipmentById));
        this.router.get("/shipments/:id", authenticate([Role.HUB]), asyncHandler(hubShipmentController.getShipmentDetails));
        this.router.patch("/shipments/:id", authenticate([Role.HUB]), asyncHandler(hubShipmentController.updateShipmentDetails));
    }
}