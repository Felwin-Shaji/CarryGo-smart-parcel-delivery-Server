import { BaseRoute } from "../base.route";
import { agencyHubController } from "../../../Infrastructure/di/resolver";
import { agencyAddHub } from "../../../Infrastructure/services/storage/multer";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { validateRequest } from "../../middlewares/ValidationMiddleware/validateRequest";
import { addNewHubBasicInfoSchema, addNewHubSchema, addNewHubVerifyOtpSchema, resendHubOtpSchema } from "../../validators/AgencyValidator/AgencyHub.validator";

export class AgencyHubRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/hub/temp-register", authenticate([Role.AGENCY]), validateRequest(addNewHubBasicInfoSchema), asyncHandler(agencyHubController.addNewHubBasicInfo));

    this.router.post("/hub/resend-otp", authenticate([Role.AGENCY]), validateRequest(resendHubOtpSchema), asyncHandler(agencyHubController.addNewHubResendOtp));

    this.router.post("/hub/verify-otp", authenticate([Role.AGENCY]), validateRequest(addNewHubVerifyOtpSchema), asyncHandler(agencyHubController.addNewHubVerifyOtp));

    this.router.get("/hub/temp-status", authenticate([Role.AGENCY]), asyncHandler(agencyHubController.checkTempHubStatus));

    this.router.post("/add-newHub", authenticate([Role.AGENCY]), agencyAddHub, validateRequest(addNewHubSchema), asyncHandler(agencyHubController.addNewHub));

    this.router.get("/hubs", authenticate([Role.AGENCY]), asyncHandler(agencyHubController.getHubs));
    this.router.get("/:agencyId/hubs", authenticate([Role.ADMIN]), asyncHandler(agencyHubController.getHubsByAgencyId));

    this.router.get("/hubs/:id", authenticate([Role.AGENCY]), asyncHandler(agencyHubController.getHubById));

  }
}