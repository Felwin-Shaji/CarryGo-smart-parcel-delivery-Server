import { BaseRoute } from "../base.route";
import { adminWalletController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";

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