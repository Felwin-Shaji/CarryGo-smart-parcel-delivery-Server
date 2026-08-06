import { Role } from "../../../Domain/Enums/Role";
import { hubShipmentController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "../BaseRoute";

export class HubShipmentRoute extends BaseRoute {

    protected initializeRoutes(): void {
        this.router.get("/shipments", authenticate([Role.HUB]), asyncHandler(hubShipmentController.getShipmentById));
        this.router.get("/shipments/:id", authenticate([Role.HUB]), asyncHandler(hubShipmentController.getShipmentDetails));
        this.router.patch("/shipments/:id", authenticate([Role.HUB]), asyncHandler(hubShipmentController.updateShipmentDetails));
    }
}