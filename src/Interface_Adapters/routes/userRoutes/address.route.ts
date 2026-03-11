import { BaseRoute } from "../base.route";
import { addressController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class AddressRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/geocode/reverse",
      authenticate(["user"]),
      asyncHandler(addressController.reverseGeocode)
    );

    this.router.post("/address",
      authenticate(["user"]),
      asyncHandler(addressController.addUserAddress)
    );

    this.router.get("/addresses",
      authenticate(["user"]),
      asyncHandler(addressController.getAddresses)
    );

    this.router.delete("/address/:addressId",
      authenticate(["user"]),
      asyncHandler(addressController.deleteAddress)
    );

    this.router.patch("/address/default/:addressId",
      authenticate(["user"]),
      asyncHandler(addressController.setDefaultAddress)
    );

  }
}