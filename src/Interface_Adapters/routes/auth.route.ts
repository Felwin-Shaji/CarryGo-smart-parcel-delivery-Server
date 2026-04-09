import { authController } from "../../Infrastructure/di/resolver";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler";
import { validateRequest } from "../middlewares/ValidationMiddleware/validateRequest";
import { forgotPasswordSchema, loginSchema, logoutSchema, refreshTokenSchema, resetPasswordSchema, sendOtpSchema, verifyOtpSchema } from "../validators/AuthValidator/auth.validator";
import { BaseRoute } from "./base.route";

export class AuthRoute extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/send-otp", validateRequest(sendOtpSchema), asyncHandler(authController.sendOtp));
        this.router.post("/verify-otp", validateRequest(verifyOtpSchema), asyncHandler(authController.verifyOtp));

        this.router.post("/refresh", validateRequest(refreshTokenSchema), asyncHandler(authController.refreshToken));

        this.router.post("/login", validateRequest(loginSchema), asyncHandler(authController.login)); 
        this.router.post("/logout", validateRequest(logoutSchema), asyncHandler(authController.logout));

        this.router.post("/forgot-password", validateRequest(forgotPasswordSchema), asyncHandler(authController.forgotPassword));
        this.router.post("/reset-password/:token", validateRequest(resetPasswordSchema), asyncHandler(authController.resetPassword));
    }
}