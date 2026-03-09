import { addressController, bookingController, travelerController, userController, walletController } from "../../Infrastructure/di/resolver";
import { workerKYCUpload } from "../../Infrastructure/services/storage/multer";
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

        this.router.post("/booking/serviceable-agencies",authenticate(["user"]),asyncHandler(bookingController.checkServiceableAgency));
        this.router.post("/booking/serviceable-travelers",authenticate(["user"]),asyncHandler(bookingController.checkServiceableTravelers));
        // this.router.get("/booking/serviceable-agencies",authenticate(["user"]),asyncHandler(bookingController.getServiceableHubsWithAgency));
        // this.router.get("/booking/serviceableaddresses",authenticate(["user"]),asyncHandler(bookingController.getAddressByPincode));
        this.router.post("/booking/calculate_price",authenticate(["user"]),asyncHandler(bookingController.calculatePrice));
        this.router.post("/booking",authenticate(["user"]),asyncHandler(bookingController.createBooking));
        this.router.post("/booking/:bookingId/payment/order",authenticate(["user"]),asyncHandler(bookingController.createPaymentOrder));
        this.router.post("/booking/payment/verify",authenticate(["user"]),asyncHandler(bookingController.verifyPayment));
        this.router.post("/booking/payment/failed",authenticate(["user"]),asyncHandler(bookingController.paymentfailure));
        this.router.get("/booking",authenticate(["user"]),asyncHandler(bookingController.userBookings));
        this.router.get("/booking/:bookingId",authenticate(["user"]),asyncHandler(bookingController.getBookingById));

        this.router.get("/geocode/reverse",authenticate(["user"]),asyncHandler(addressController.reverseGeocode));
        this.router.post("/address",authenticate(["user"]),asyncHandler(addressController.addUserAddress));
        this.router.get("/addresses",authenticate(["user"]),asyncHandler(addressController.getAddresses));
        this.router.delete("/address/:addressId",authenticate(["user"]),asyncHandler(addressController.deleteAddress));
        this.router.patch("/address/default/:addressId",authenticate(["user"]),asyncHandler(addressController.setDefaultAddress));

        this.router.get('/wallet',authenticate(["user"]),asyncHandler(walletController.getWalletOverview))
        this.router.post('/wallet/create-order',authenticate(["user"]),asyncHandler(walletController.createAddMoneyOrder))
        this.router.post('/wallet/withdraw',authenticate(["user"]),asyncHandler(walletController.withdrawMoney))

        this.router.post('/traveler/kyc',authenticate(["user"]),workerKYCUpload,asyncHandler(travelerController.submitKYC));
        this.router.put('/traveler/kyc',authenticate(["user"]),workerKYCUpload,asyncHandler(travelerController.reSubmitKYC));
        this.router.get('/traveler/kyc',authenticate(["user"]),asyncHandler(travelerController.getKyc));
        this.router.post('/traveler/travel-requests',authenticate(["user"]),asyncHandler(travelerController.createTravelRequest));
        this.router.get('/traveler/travel-requests',authenticate(["user"]),asyncHandler(travelerController.getTravelRequests));
        this.router.get('/traveler/travel-requests/:id',authenticate(["user"]),asyncHandler(travelerController.getTravelRequestById));
    }
}