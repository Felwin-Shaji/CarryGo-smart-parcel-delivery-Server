import { BaseRoute } from "../base.route";
import { agencyHubController, hubDashboardController, hubWorkerController } from "../../../Infrastructure/di/resolver";
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

    this.router.put("/hubs/:id/resubmit", authenticate([Role.AGENCY]), agencyAddHub, asyncHandler(agencyHubController.resubmitHub));

    this.router.get("/hubs", authenticate([Role.AGENCY]), asyncHandler(agencyHubController.getHubs));

    this.router.get("/hubs/:id", authenticate([Role.AGENCY]), asyncHandler(agencyHubController.getHubById));

    this.router.get("/hub/:hubId/workers", authenticate([Role.AGENCY]), asyncHandler(hubWorkerController.getHubWorkers))
    this.router.get("/hub/dashboard/summary/:hubId", authenticate([Role.AGENCY]), asyncHandler(hubDashboardController.getSummary));
    this.router.get("/hub/dashboard/trend/:hubId", authenticate([Role.AGENCY]), asyncHandler(hubDashboardController.getTrend));
    this.router.get("/hub/dashboard/types/:hubId", authenticate([Role.AGENCY]), asyncHandler(hubDashboardController.getTypes));
    this.router.get("/hub/dashboard/shipments-preview/:hubId", authenticate([Role.AGENCY]), asyncHandler(hubDashboardController.getShipmentsPreview));
  }
}