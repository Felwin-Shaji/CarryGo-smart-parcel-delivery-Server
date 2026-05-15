import { BaseRoute } from "../base.route";
import { walletController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";

export class WalletRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/wallet",
      authenticate([Role.USER]),
      asyncHandler(walletController.getWalletOverview)
    );

    this.router.post("/wallet/create-order",
      authenticate([Role.USER]),
      asyncHandler(walletController.createAddMoneyOrder)
    );

    this.router.post("/wallet/withdraw",
      authenticate([Role.USER]),
      asyncHandler(walletController.withdrawMoney)
    );

  }
}