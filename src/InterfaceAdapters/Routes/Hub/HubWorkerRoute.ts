import { BaseRoute } from "../BaseRoute";
import { hubWorkerController, workerDashboardController } from "../../../Infrastructure/DI/resolver";
import { workerKYCUpload } from "../../../Infrastructure/Services/Storage/multer";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { addWorkerTempSchema, reSubmitWorkerKycSchema, verifyWorkerOtpSchema, workerKycUploadSchema } from "../../Validators/Hub/hubWorkerValidator";

export class HubWorkerRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/worker/temp-register", authenticate([Role.HUB]), validateRequest(addWorkerTempSchema), asyncHandler(hubWorkerController.addNewWorker));
    this.router.post("/worker/verify-otp", authenticate([Role.HUB]), validateRequest(verifyWorkerOtpSchema), asyncHandler(hubWorkerController.verifyWorkerOtp));
    this.router.post("/worker/resend-otp", authenticate([Role.HUB]), asyncHandler(hubWorkerController.resendWorkerOtp));
    this.router.post("/worker/kyc-upload", authenticate([Role.HUB]), workerKYCUpload, validateRequest(workerKycUploadSchema), asyncHandler(hubWorkerController.uploadWorkerKYC));

    this.router.get("/workers", authenticate([Role.HUB]), asyncHandler(hubWorkerController.getHubWorkers));
    this.router.get("/worker/check-status", authenticate([Role.HUB]), asyncHandler(hubWorkerController.checkTempWorkerStatus))


    this.router.get("/workers/:id", authenticate([Role.HUB]), asyncHandler(hubWorkerController.getHubWorkerById))
    this.router.get("/workers/:id/kyc", authenticate([Role.HUB]), asyncHandler(hubWorkerController.getWorkerKycController))
    this.router.patch("/workers/:id/kyc/resubmit", authenticate([Role.HUB]), workerKYCUpload, validateRequest(reSubmitWorkerKycSchema), asyncHandler(hubWorkerController.reSubmitWorkerKycController))

    this.router.get("/worker/parcels/:workerId", authenticate([Role.HUB]), asyncHandler(workerDashboardController.getWorkerParcelsByWorkerId));
    this.router.get("/worker/dashboard/:workerId", authenticate([Role.HUB]), asyncHandler(workerDashboardController.getWorkerDashboardByWorkerId));
    this.router.get("/worker/analytics/graph/:workerId", authenticate([Role.HUB]), asyncHandler(workerDashboardController.getWorkerGraphByWorkerId));
  }
}