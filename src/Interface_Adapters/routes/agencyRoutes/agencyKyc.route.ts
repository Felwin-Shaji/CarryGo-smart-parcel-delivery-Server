import { BaseRoute } from "../base.route";
import { agencyController } from "../../../Infrastructure/di/resolver";
import { agencyuploadKYC } from "../../../Infrastructure/services/storage/multer";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AgencyKycRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post(
      "/kyc-varification",
      authenticate(["agency"]),
      agencyuploadKYC,
      asyncHandler(agencyController.submitKYC)
    );

    this.router.get(
      "/dashboard/resubmit-kyc/:id",
      authenticate(["agency"]),
      asyncHandler(agencyController.getReSubmitKyc)
    );

    this.router.put(
      "/dashboard/resubmit-kyc",
      authenticate(["agency"]),
      agencyuploadKYC,
      asyncHandler(agencyController.reSubmitKyc)
    );

  }
}