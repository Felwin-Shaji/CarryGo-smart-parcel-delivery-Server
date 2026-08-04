import { BaseRoute } from "../base.route";
import { addressController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { addUserAddressSchema } from "../../Validators/User/address.validator";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";

export class AddressRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.get("/geocode/reverse", authenticate([Role.USER]), asyncHandler(addressController.reverseGeocode));

    this.router.post("/address", authenticate([Role.USER]),validateRequest(addUserAddressSchema),  asyncHandler(addressController.addUserAddress));

    this.router.get("/addresses", authenticate([Role.USER]), asyncHandler(addressController.getAddresses));

    this.router.delete("/address/:addressId", authenticate([Role.USER]), asyncHandler(addressController.deleteAddress));

    this.router.patch("/address/default/:addressId", authenticate([Role.USER]), asyncHandler(addressController.setDefaultAddress));

  }
}