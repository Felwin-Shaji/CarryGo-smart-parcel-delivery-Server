import { authController } from "../../Infrastructure/di/resolver.js";
import { BaseRoute } from "./base.route.js";

export class AuthRoute extends BaseRoute{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/send-otp",authController.sendOtp)
    }
}