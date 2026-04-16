import { BaseRoute } from "../base.route";
import { travelerController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { workerKYCUpload } from "../../../Infrastructure/services/storage/multer";
import { Role } from "@/Domain/Enums/Roles";

export class TravelerRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/traveler/kyc",
      authenticate([Role.USER]),
      workerKYCUpload,
      asyncHandler(travelerController.submitKYC)
    );

    this.router.put("/traveler/kyc",
      authenticate([Role.USER]),
      workerKYCUpload,
      asyncHandler(travelerController.reSubmitKYC)
    );

    this.router.get("/traveler/kyc",
      authenticate([Role.USER]),
      asyncHandler(travelerController.getKyc)
    );

    this.router.post("/traveler/travel-requests",
      authenticate([Role.USER]),
      asyncHandler(travelerController.createTravelRequest)
    );

    this.router.get("/traveler/travel-requests",
      authenticate([Role.USER]),
      asyncHandler(travelerController.getTravelRequests)
    );

    this.router.get("/traveler/travel-requests/:id",
      authenticate([Role.USER]),
      asyncHandler(travelerController.getTravelRequestById)
    );

  }
}