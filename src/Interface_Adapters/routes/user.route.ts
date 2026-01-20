import { addressController, bookingController, userController } from "../../Infrastructure/di/resolver";
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "./base.route";

export class UserRoute extends BaseRoute {
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.get("/profile",authenticate(["user"]),asyncHandler(userController.getUserProfile))
        this.router.patch("/edit-profile",authenticate(["user"]),asyncHandler(userController.updateUserProfile))
        this.router.patch("/reset-password",authenticate(["user"]),asyncHandler(userController.resetUserPassword))

        this.router.post("/booking/pincode/validate",authenticate(["user"]),asyncHandler(bookingController.validatePincode));
        this.router.get("/booking/serviceable-agencies",authenticate(["user"]),asyncHandler(bookingController.getServiceableHubsWithAgency));
        this.router.get("/booking/serviceable-addresses",authenticate(["user"]),asyncHandler(bookingController.getAddressByPincode));

        this.router.get("/geocode/reverse",authenticate(["user"]),asyncHandler(addressController.reverseGeocode));

        this.router.post("/address",authenticate(["user"]),asyncHandler(addressController.addUserAddress));
        this.router.get("/addresses",authenticate(["user"]),asyncHandler(addressController.getAddresses));
        this.router.delete("/address/:addressId",authenticate(["user"]),asyncHandler(addressController.deleteAddress));
        this.router.patch("/address/default/:addressId",authenticate(["user"]),asyncHandler(addressController.setDefaultAddress));
    }
}