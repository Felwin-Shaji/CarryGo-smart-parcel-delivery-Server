import { BaseRoute } from "../BaseRoute";
import { agencyController } from "../../../Infrastructure/DI/resolver";
import { agencyuploadKYC } from "../../../Infrastructure/Services/Storage/multer";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { agencyKycSchema, resubmitKycSchema } from "../../Validators/Agency/agencyValidator";

export class AgencyKycRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/kyc-varification", authenticate([Role.AGENCY]), agencyuploadKYC, validateRequest(agencyKycSchema), asyncHandler(agencyController.submitKYC));

    this.router.get("/dashboard/resubmit-kyc/:id", authenticate([Role.AGENCY]), asyncHandler(agencyController.getReSubmitKyc));

    this.router.put("/dashboard/resubmit-kyc", authenticate([Role.AGENCY]), agencyuploadKYC, validateRequest(resubmitKycSchema), asyncHandler(agencyController.reSubmitKyc));

  }
}