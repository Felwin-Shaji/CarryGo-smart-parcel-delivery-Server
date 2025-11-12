import { authController } from "../../Infrastructure/di/resolver.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler.js";
import { BaseRoute } from "./base.route.js";

export class AuthRoute extends BaseRoute{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/send-otp",asyncHandler(authController.sendOtp));
        this.router.post("/verify-otp",asyncHandler(authController.verifyOtp));
        this.router.post("/refresh",asyncHandler(authController.refreshToken));
        this.router.post("/login",asyncHandler(authController.login));

        this.router.post("/logout",asyncHandler(authController.logout));

        this.router.get("/aaa",authenticate(["user"]),(req,res)=>{
            res.send("authentacited route")
        })
    }
}