import { BaseRoute } from "../base.route";
import { agencyWalletController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AgencyWalletRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/wallet",
      authenticate(["agency"]),
      asyncHandler(agencyWalletController.getAgencyWalletOverview)
    );

    this.router.post(
      "/wallet/create-order",
      authenticate(["agency"]),
      asyncHandler(agencyWalletController.createAddMoneyOrder)
    );

    this.router.post(
      "/wallet/withdraw",
      authenticate(["agency"]),
      asyncHandler(agencyWalletController.withdrawMoney)
    );

  }
}