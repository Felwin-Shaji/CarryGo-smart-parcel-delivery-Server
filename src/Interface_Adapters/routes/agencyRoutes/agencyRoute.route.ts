import { agencyRouteController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";

export class AgencyRouteGroupRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.post("/route-groups", authenticate(["agency"]), agencyRouteController.createRouteGroup)
        this.router.get("/route-groups", authenticate(["agency"]), agencyRouteController.getPaginateRouteGroup)
    }

}