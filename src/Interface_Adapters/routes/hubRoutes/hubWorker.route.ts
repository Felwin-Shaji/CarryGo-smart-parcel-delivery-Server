import { BaseRoute } from "../base.route";
import { hubWorkerController } from "../../../Infrastructure/di/resolver";
import { workerKYCUpload } from "../../../Infrastructure/services/storage/multer";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class HubWorkerRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post(
      "/worker/temp-register",
      authenticate(["hub"]),
      asyncHandler(hubWorkerController.addNewWorker)
    );

    this.router.post(
      "/worker/verify-otp",
      authenticate(["hub"]),
      asyncHandler(hubWorkerController.verifyWorkerOtp)
    );

    this.router.post(
      "/worker/kyc-upload",
      authenticate(["hub"]),
      workerKYCUpload,
      asyncHandler(hubWorkerController.uploadWorkerKYC)
    );

    this.router.get(
      "/workers",
      authenticate(["hub"]),
      asyncHandler(hubWorkerController.getHubWorkers)
    );

  }
}