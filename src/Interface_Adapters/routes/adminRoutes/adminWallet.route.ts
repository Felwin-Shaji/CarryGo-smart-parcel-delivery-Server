import { BaseRoute } from "../base.route";
import { adminWalletController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";

export class AdminWalletRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/wallet",
      authenticate([Role.ADMIN]),
      asyncHandler(adminWalletController.getAdminWalletOverview)
    );

    this.router.post(
      "/wallet/create-order",
      authenticate([Role.ADMIN]),
      asyncHandler(adminWalletController.createAddMoneyOrder)
    );

    this.router.post(
      "/wallet/withdraw",
      authenticate([Role.ADMIN]),
      asyncHandler(adminWalletController.withdrawMoney)
    );

  }
}