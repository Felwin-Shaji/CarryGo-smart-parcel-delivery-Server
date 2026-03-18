import { BaseRoute } from "../base.route";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { agencyRouteSegmentController } from "../../../Infrastructure/di/resolver"



export class AgencyRouteSegmentRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.get("/route-groups/:routeGroupId", authenticate(["agency"]), agencyRouteSegmentController.getRouteGroupDetail);
        this.router.post("/route-groups/:routeGroupId/segments", authenticate(["agency"]), agencyRouteSegmentController.createSegment);
    }
}