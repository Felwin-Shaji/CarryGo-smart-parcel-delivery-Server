import { Role } from "../../../Domain/Enums/Role"
import { agencyRouteController } from "../../../Infrastructure/DI/resolver"
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate"
import { BaseRoute } from "../BaseRoute"
import { createRouteGroupSchema } from "../../Validators/Agency/agencyRouteValidator"
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest"

export class AgencyRouteGroupRoute extends BaseRoute {
    protected initializeRoutes(): void {
        this.router.post("/route-groups", authenticate([Role.AGENCY]), validateRequest(createRouteGroupSchema), agencyRouteController.createRouteGroup)
        this.router.get("/route-groups", authenticate([Role.AGENCY]), agencyRouteController.getPaginateRouteGroup)
    }
}