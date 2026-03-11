import { BaseRoute } from "../base.route";
import { bookingController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";

export class BookingRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/booking/serviceable-agencies",
      authenticate(["user"]),
      asyncHandler(bookingController.checkServiceableAgency)
    );

    this.router.post("/booking/serviceable-travelers",
      authenticate(["user"]),
      asyncHandler(bookingController.checkServiceableTravelers)
    );

    this.router.post("/booking/calculate_price",
      authenticate(["user"]),
      asyncHandler(bookingController.calculatePrice)
    );

    this.router.post("/booking",
      authenticate(["user"]),
      asyncHandler(bookingController.createBooking)
    );

    this.router.post("/booking/:bookingId/payment/order",
      authenticate(["user"]),
      asyncHandler(bookingController.createPaymentOrder)
    );

    this.router.post("/booking/payment/verify",
      authenticate(["user"]),
      asyncHandler(bookingController.verifyPayment)
    );

    this.router.post("/booking/payment/failed",
      authenticate(["user"]),
      asyncHandler(bookingController.paymentfailure)
    );

    this.router.get("/booking",
      authenticate(["user"]),
      asyncHandler(bookingController.userBookings)
    );

    this.router.get("/booking/:bookingId",
      authenticate(["user"]),
      asyncHandler(bookingController.getBookingById)
    );

  }
}