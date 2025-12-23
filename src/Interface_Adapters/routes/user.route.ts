import { bookingController, userController } from "../../Infrastructure/di/resolver";
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "./base.route";

export class UserRoute extends BaseRoute {
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.get("/profile",authenticate(["user"]),asyncHandler(userController.getUserProfile))
        this.router.patch("/edit-profile",authenticate(["user"]),asyncHandler(userController.updateUserProfile))
        this.router.patch("/reset-password",authenticate(["user"]),asyncHandler(userController.resetUserPassword))

        this.router.post("/booking/pincode/validate",authenticate(["user"]),asyncHandler(bookingController.validatePincode))
    }
}