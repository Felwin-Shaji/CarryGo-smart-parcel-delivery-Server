import { BaseRoute } from "../base.route";
import { adminWalletController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AdminWalletRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/wallet",
      authenticate(["admin"]),
      asyncHandler(adminWalletController.getAdminWalletOverview)
    );

    this.router.post(
      "/wallet/create-order",
      authenticate(["admin"]),
      asyncHandler(adminWalletController.createAddMoneyOrder)
    );

    this.router.post(
      "/wallet/withdraw",
      authenticate(["admin"]),
      asyncHandler(adminWalletController.withdrawMoney)
    );

  }
}