import { BaseRoute } from "../BaseRoute";
import { walletController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";

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