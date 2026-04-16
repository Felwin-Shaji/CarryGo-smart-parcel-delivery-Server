import { BaseRoute } from "../base.route";
import { agencyWalletController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";

export class AgencyWalletRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/wallet",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyWalletController.getAgencyWalletOverview)
    );

    this.router.post(
      "/wallet/create-order",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyWalletController.createAddMoneyOrder)
    );

    this.router.post(
      "/wallet/withdraw",
      authenticate([Role.AGENCY]),
      asyncHandler(agencyWalletController.withdrawMoney)
    );

  }
}