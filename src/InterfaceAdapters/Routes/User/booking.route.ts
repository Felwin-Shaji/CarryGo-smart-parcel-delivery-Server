import { BaseRoute } from "../base.route";
import { bookingController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { calculatePriceSchema, checkServiceableAgencySchema, checkServiceableTravelerSchema, createBookingSchema } from "../../Validators/User/booking.validator";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";

export class BookingRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/booking/serviceable-agencies", authenticate([Role.USER]), validateRequest(checkServiceableAgencySchema), asyncHandler(bookingController.checkServiceableAgency));

    this.router.post("/booking/serviceable-travelers", authenticate([Role.USER]), validateRequest(checkServiceableTravelerSchema), asyncHandler(bookingController.checkServiceableTravelers));

    this.router.post("/booking/calculate_price", authenticate([Role.USER]), validateRequest(calculatePriceSchema), asyncHandler(bookingController.calculatePrice));

    this.router.post("/booking", authenticate([Role.USER]), validateRequest(createBookingSchema), asyncHandler(bookingController.createBooking));

    this.router.post("/booking/:bookingId/payment/order", authenticate([Role.USER]), asyncHandler(bookingController.createPaymentOrder));

    this.router.post("/booking/payment/verify", authenticate([Role.USER]), asyncHandler(bookingController.verifyPayment));

    this.router.post("/booking/payment/failed", authenticate([Role.USER]), asyncHandler(bookingController.paymentfailure));

    this.router.get("/booking", authenticate([Role.USER]), asyncHandler(bookingController.userBookings));

    this.router.get("/booking/:bookingId", authenticate([Role.USER]), asyncHandler(bookingController.getBookingById));

  }
}