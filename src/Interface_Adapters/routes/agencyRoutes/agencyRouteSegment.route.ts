import { BaseRoute } from "../base.route";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { agencyRouteSegmentController } from "../../../Infrastructure/di/resolver"
import { Role } from "../../../Domain/Enums/Roles";



export class AgencyRouteSegmentRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/route-groups/:routeGroupId", authenticate([Role.AGENCY]), agencyRouteSegmentController.getRouteGroupDetail);
        this.router.post("/route-groups/:routeGroupId/segments", authenticate([Role.AGENCY]), agencyRouteSegmentController.createSegment);
        this.router.patch("/route-groups/:id/status", authenticate([Role.AGENCY]),agencyRouteSegmentController.updateRouteGroupStatus)
    }
}