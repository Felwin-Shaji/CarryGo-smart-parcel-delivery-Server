import { BaseRoute } from "../base.route";
import { hubWalletController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";

export class HubWalletRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get(
      "/wallet",
      authenticate([Role.HUB]),
      asyncHandler(hubWalletController.getHubWalletOverview)
    );

    this.router.post(
      "/wallet/create-order",
      authenticate([Role.HUB]),
      asyncHandler(hubWalletController.createAddMoneyOrder)
    );

    this.router.post(
      "/wallet/withdraw",
      authenticate([Role.HUB]),
      asyncHandler(hubWalletController.withdrawMoney)
    );

  }
}