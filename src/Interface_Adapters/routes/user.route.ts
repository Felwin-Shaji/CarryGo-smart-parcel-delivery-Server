import { userController } from "../../Infrastructure/di/resolver";
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "./base.route";

export class UserRoute extends BaseRoute {
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.get("/profile",authenticate(["user"]),asyncHandler(userController.getUserProfile))
    }
}