import { authController } from "../../Infrastructure/di/resolver.js";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler.js";
import { BaseRoute } from "./base.route.js";

export class AuthRoute extends BaseRoute{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/send-otp",asyncHandler(authController.sendOtp))

        this.router.post("/verify-otp",asyncHandler(authController.verifyOtp))
    }
}