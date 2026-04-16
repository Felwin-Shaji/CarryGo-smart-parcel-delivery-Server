import { BaseRoute } from "../base.route";
import { bookingController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";
import { calculatePriceSchema, checkServiceableAgencySchema, checkServiceableTravelerSchema, createBookingSchema } from "@/Interface_Adapters/validators/UserValidator/booking.validator";
import { validateRequest } from "@/Interface_Adapters/middlewares/ValidationMiddleware/validateRequest";

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