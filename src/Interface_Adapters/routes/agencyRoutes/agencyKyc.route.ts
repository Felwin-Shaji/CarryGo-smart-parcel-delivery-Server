import { BaseRoute } from "../base.route";
import { agencyController } from "../../../Infrastructure/di/resolver";
import { agencyuploadKYC } from "../../../Infrastructure/services/storage/multer";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";
import { validateRequest } from "@/Interface_Adapters/middlewares/ValidationMiddleware/validateRequest";
import { agencyKycSchema, resubmitKycSchema } from "@/Interface_Adapters/validators/AgencyValidator/agency.validator";

export class AgencyKycRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/kyc-varification", authenticate([Role.AGENCY]), agencyuploadKYC, validateRequest(agencyKycSchema), asyncHandler(agencyController.submitKYC));

    this.router.get("/dashboard/resubmit-kyc/:id", authenticate([Role.AGENCY]), asyncHandler(agencyController.getReSubmitKyc));

    this.router.put("/dashboard/resubmit-kyc", authenticate([Role.AGENCY]), agencyuploadKYC, validateRequest(resubmitKycSchema), asyncHandler(agencyController.reSubmitKyc));

  }
}