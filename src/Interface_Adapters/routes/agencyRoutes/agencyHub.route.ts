import { BaseRoute } from "../base.route";
import { agencyHubController } from "../../../Infrastructure/di/resolver";
import { agencyAddHub } from "../../../Infrastructure/services/storage/multer";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";

export class AgencyHubRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post(
      "/hub/temp-register",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyHubController.addNewHubBasicInfo)
    );

    this.router.post(
      "/hub/resend-otp",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyHubController.addNewHubResendOtp)
    );

    this.router.post(
      "/hub/verify-otp",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyHubController.addNewHubVerifyOtp)
    );

    this.router.get(
      "/hub/temp-status",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyHubController.checkTempHubStatus)
    );

    this.router.post(
      "/add-newHub",
      authenticate([Role.AGENCY]), 
      agencyAddHub,
      asyncHandler(agencyHubController.addNewHub)
    );

    this.router.get(
      "/hubs",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyHubController.getHubs)
    );

    this.router.get(
      "/hubs/:id",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyHubController.getHubById)
    );

  }
}