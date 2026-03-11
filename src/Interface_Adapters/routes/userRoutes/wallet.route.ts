import { BaseRoute } from "../base.route";
import { walletController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class WalletRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/wallet",
      authenticate(["user"]),
      asyncHandler(walletController.getWalletOverview)
    );

    this.router.post("/wallet/create-order",
      authenticate(["user"]),
      asyncHandler(walletController.createAddMoneyOrder)
    );

    this.router.post("/wallet/withdraw",
      authenticate(["user"]),
      asyncHandler(walletController.withdrawMoney)
    );

  }
}