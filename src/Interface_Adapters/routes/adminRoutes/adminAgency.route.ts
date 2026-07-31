import { BaseRoute } from "../base.route";
import { adminAgencyController, adminHubController, agencyDashboardController, agencyHubController, hubDashboardController, hubWorkerController, workerDashboardController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { validateRequest } from "../../middlewares/ValidationMiddleware/validateRequest";
import { updateAgencyKycSchema, updateHubKycSchema } from "../../validators/AdminValidator/adminAgency.validator";


export class AdminAgencyRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/agency", authenticate([Role.ADMIN]), asyncHandler(adminAgencyController.getAgencies));

    this.router.get("/agency/:id", authenticate([Role.ADMIN]), asyncHandler(adminAgencyController.getAgencyById));

    this.router.patch("/agency/:id/kyc-status", authenticate([Role.ADMIN]), validateRequest(updateAgencyKycSchema), asyncHandler(adminAgencyController.updateAgencyKyc));

    this.router.patch("/agency/:id/status", authenticate([Role.ADMIN]), asyncHandler(adminAgencyController.updateAgencyStatus));

    this.router.get("/agency/hub/:id", authenticate([Role.ADMIN]), asyncHandler(adminHubController.getHubById));

    this.router.patch("/agency/hub/:id", authenticate([Role.ADMIN]), validateRequest(updateHubKycSchema), asyncHandler(adminHubController.updateHubKyc));

    this.router.get("/agency/hub/worker/:id", authenticate([Role.ADMIN]), asyncHandler(adminHubController.getHubWorkerById));

    this.router.get("/agency/:agencyId/hubs", authenticate([Role.ADMIN]), asyncHandler(agencyHubController.getHubsByAgencyId));

    this.router.get("/agency/dashboard/:id", authenticate([Role.ADMIN]), asyncHandler(agencyDashboardController.getDashboardById));
    this.router.get("/agency/dashboard/sales-chart/:id", authenticate([Role.ADMIN]), asyncHandler(agencyDashboardController.getSalesChartById));
    this.router.get("/agency/dashboard/sales-report/:id", authenticate([Role.ADMIN]), asyncHandler(agencyDashboardController.getSalesReportById));
    this.router.get("/agency/dashboard/deliveries-chart/:id", authenticate([Role.ADMIN]), asyncHandler(agencyDashboardController.getDeliveriesChartById));
    this.router.get("/agency/dashboard/sales-report/export/:id", authenticate([Role.ADMIN]), asyncHandler(agencyDashboardController.exportSalesReportById));

    this.router.get("/agency/hub/:hubId/workers", authenticate([Role.ADMIN]), asyncHandler(hubWorkerController.getHubWorkers))
    this.router.get("/agency/hub/dashboard/summary/:hubId", authenticate([Role.ADMIN]), asyncHandler(hubDashboardController.getSummary));
    this.router.get("/agency/hub/dashboard/trend/:hubId", authenticate([Role.ADMIN]), asyncHandler(hubDashboardController.getTrend));
    this.router.get("/agency/hub/dashboard/types/:hubId", authenticate([Role.ADMIN]), asyncHandler(hubDashboardController.getTypes));
    this.router.get("/agency/hub/dashboard/shipments-preview/:hubId", authenticate([Role.ADMIN]), asyncHandler(hubDashboardController.getShipmentsPreview));

    this.router.get("/agency/hub/worker/parcels/:workerId", authenticate([Role.ADMIN]), asyncHandler(workerDashboardController.getWorkerParcelsByWorkerId));
    this.router.get("/agency/hub/worker/dashboard/:workerId", authenticate([Role.ADMIN]), asyncHandler(workerDashboardController.getWorkerDashboardByWorkerId));
    this.router.get("/agency/hub/worker/analytics/graph/:workerId", authenticate([Role.ADMIN]), asyncHandler(workerDashboardController.getWorkerGraphByWorkerId));

  }
}