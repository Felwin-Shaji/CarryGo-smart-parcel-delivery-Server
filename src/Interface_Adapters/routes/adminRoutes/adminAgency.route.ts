import { BaseRoute } from "../base.route";
import { adminAgencyController, adminHubController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";
import { updateAgencyKycSchema, updateHubKycSchema } from "@/Interface_Adapters/validators/AdminValidator/adminAgency.validator";
import { validateRequest } from "@/Interface_Adapters/middlewares/ValidationMiddleware/validateRequest";

export class AdminAgencyRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/agency", authenticate([Role.ADMIN]), asyncHandler(adminAgencyController.getAgencies));

    this.router.get("/agency/:id", authenticate([Role.ADMIN]), asyncHandler(adminAgencyController.getAgencyById));

    this.router.patch("/agency/:id/kyc-status", authenticate([Role.ADMIN]), validateRequest(updateAgencyKycSchema), asyncHandler(adminAgencyController.updateAgencyKyc));

    this.router.patch("/agency/:id/status", authenticate([Role.ADMIN]), asyncHandler(adminAgencyController.updateAgencyStatus));

    this.router.get("/agency/hub/:id", authenticate([Role.ADMIN]), asyncHandler(adminHubController.getHubById));

    this.router.patch("/agency/hub/:id", authenticate([Role.ADMIN]), validateRequest(updateHubKycSchema), asyncHandler(adminHubController.updateHubKyc));

    this.router.get("/agency/hub/worker/:id", authenticate([Role.ADMIN]), asyncHandler(adminHubController.getHubWorkerById))

  }
}