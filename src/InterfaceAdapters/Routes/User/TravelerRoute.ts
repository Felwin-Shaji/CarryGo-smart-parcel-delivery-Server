import { BaseRoute } from "../BaseRoute";
import { travelerController } from "../../../Infrastructure/DI/resolver";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { workerKYCUpload } from "../../../Infrastructure/Services/Storage/multer";
import { Role } from "../../../Domain/Enums/Role";
import { validateRequest } from "../../Middlewares/ValidationMiddleware/validateRequest";
import { createTravelRequestSchema, reSubmitTravelerKycSchema, submitTravelerKycSchema } from "../../Validators/User/travelerValidator";

export class TravelerRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/traveler/kyc", authenticate([Role.USER]), workerKYCUpload, validateRequest(submitTravelerKycSchema), asyncHandler(travelerController.submitKYC));

    this.router.put("/traveler/kyc", authenticate([Role.USER]), workerKYCUpload, validateRequest(reSubmitTravelerKycSchema), asyncHandler(travelerController.reSubmitKYC));

    this.router.get("/traveler/kyc", authenticate([Role.USER]), asyncHandler(travelerController.getKyc));

    this.router.post("/traveler/travel-requests", authenticate([Role.USER]), validateRequest(createTravelRequestSchema), asyncHandler(travelerController.createTravelRequest));

    this.router.get("/traveler/travel-requests", authenticate([Role.USER]), asyncHandler(travelerController.getTravelRequests));

    this.router.get("/traveler/travel-requests/:id", authenticate([Role.USER]), asyncHandler(travelerController.getTravelRequestById));

    this.router.get("/traveler/travel-requests/:bookingId", authenticate([Role.USER]), asyncHandler(travelerController.getTravelerBookingDetails))

    this.router.patch("/traveler/travel-requests/order/:bookingId/status", authenticate([Role.USER]), asyncHandler(travelerController.updateBookingStatus))

  }
}