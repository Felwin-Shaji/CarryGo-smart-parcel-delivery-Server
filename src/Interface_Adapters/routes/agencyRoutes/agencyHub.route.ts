import { BaseRoute } from "../base.route";
import { agencyHubController } from "../../../Infrastructure/di/resolver";
import { agencyAddHub } from "../../../Infrastructure/services/storage/multer";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AgencyHubRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post(
      "/hub/temp-register",
      authenticate(["agency"]),
      asyncHandler(agencyHubController.addNewHubBasicInfo)
    );

    this.router.post(
      "/hub/resend-otp",
      authenticate(["agency"]),
      asyncHandler(agencyHubController.addNewHubResendOtp)
    );

    this.router.post(
      "/hub/verify-otp",
      authenticate(["agency"]),
      asyncHandler(agencyHubController.addNewHubVerifyOtp)
    );

    this.router.get(
      "/hub/temp-status",
      authenticate(["agency"]),
      asyncHandler(agencyHubController.checkTempHubStatus)
    );

    this.router.post(
      "/add-newHub",
      authenticate(["agency"]), 
      agencyAddHub,
      asyncHandler(agencyHubController.addNewHub)
    );

    this.router.get(
      "/hubs",
      authenticate(["agency"]),
      asyncHandler(agencyHubController.getHubs)
    );

    this.router.get(
      "/hubs/:id",
      authenticate(["agency"]),
      asyncHandler(agencyHubController.getHubById)
    );

  }
}