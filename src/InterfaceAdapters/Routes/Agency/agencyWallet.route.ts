import { BaseRoute } from "../base.route";
import { agencyWalletController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";

export class AgencyWalletRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/wallet", authenticate([Role.AGENCY]), asyncHandler(agencyWalletController.getAgencyWalletOverview));

    this.router.post("/wallet/create-order", authenticate([Role.AGENCY]), asyncHandler(agencyWalletController.createAddMoneyOrder));

    this.router.post("/wallet/withdraw", authenticate([Role.AGENCY]), asyncHandler(agencyWalletController.withdrawMoney));

  }
}