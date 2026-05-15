import { BaseRoute } from "../base.route";
import { addressController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { addUserAddressSchema } from "../../validators/UserValidator/address.validator";
import { validateRequest } from "../../middlewares/ValidationMiddleware/validateRequest";

export class AddressRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/geocode/reverse", authenticate([Role.USER]), asyncHandler(addressController.reverseGeocode));

    this.router.post("/address", authenticate([Role.USER]),validateRequest(addUserAddressSchema),  asyncHandler(addressController.addUserAddress));

    this.router.get("/addresses", authenticate([Role.USER]), asyncHandler(addressController.getAddresses));

    this.router.delete("/address/:addressId", authenticate([Role.USER]), asyncHandler(addressController.deleteAddress));

    this.router.patch("/address/default/:addressId", authenticate([Role.USER]), asyncHandler(addressController.setDefaultAddress));

  }
}