import { BaseRoute } from "../base.route";
import { hubWorkerController } from "../../../Infrastructure/di/resolver";
import { workerKYCUpload } from "../../../Infrastructure/services/storage/multer";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";

export class HubWorkerRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post(
      "/worker/temp-register",
      authenticate([Role.HUB]),
      asyncHandler(hubWorkerController.addNewWorker)
    );

    this.router.post(
      "/worker/verify-otp",
      authenticate([Role.HUB]),
      asyncHandler(hubWorkerController.verifyWorkerOtp)
    );

    this.router.post(
      "/worker/kyc-upload",
      authenticate([Role.HUB]),
      workerKYCUpload,
      asyncHandler(hubWorkerController.uploadWorkerKYC)
    );

    this.router.get(
      "/workers",
      authenticate([Role.HUB]),
      asyncHandler(hubWorkerController.getHubWorkers)
    );

    this.router.get(
      "/worker/check-status",
      authenticate([Role.HUB]),
      asyncHandler(hubWorkerController.checkTempWorkerStatus)
    )

      
    this.router.get("/workers/:id", authenticate([Role.HUB]), asyncHandler(hubWorkerController.getHubWorkerById))
    this.router.get("/workers/:id/kyc",authenticate([Role.HUB]), asyncHandler(hubWorkerController.getWorkerKycController))
    this.router.patch("/workers/:id/kyc/resubmit",authenticate([Role.HUB]), workerKYCUpload ,asyncHandler(hubWorkerController.reSubmitWorkerKycController))
  }
}