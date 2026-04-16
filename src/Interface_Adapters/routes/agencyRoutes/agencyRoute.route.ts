import { Role } from "@/Domain/Enums/Roles";
import { agencyRouteController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { BaseRoute } from "../base.route";

export class AgencyRouteGroupRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.post("/route-groups", authenticate([Role.AGENCY]), agencyRouteController.createRouteGroup)
        this.router.get("/route-groups", authenticate([Role.AGENCY]), agencyRouteController.getPaginateRouteGroup)
    }

}