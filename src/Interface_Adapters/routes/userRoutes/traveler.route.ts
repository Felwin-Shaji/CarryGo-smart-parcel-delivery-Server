import { BaseRoute } from "../base.route";
import { travelerController } from "../../../Infrastructure/di/resolver";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { workerKYCUpload } from "../../../Infrastructure/services/storage/multer";

export class TravelerRoute extends BaseRoute {

  protected initializeRoutes(): void {

    this.router.post("/traveler/kyc",
      authenticate(["user"]),
      workerKYCUpload,
      asyncHandler(travelerController.submitKYC)
    );

    this.router.put("/traveler/kyc",
      authenticate(["user"]),
      workerKYCUpload,
      asyncHandler(travelerController.reSubmitKYC)
    );

    this.router.get("/traveler/kyc",
      authenticate(["user"]),
      asyncHandler(travelerController.getKyc)
    );

    this.router.post("/traveler/travel-requests",
      authenticate(["user"]),
      asyncHandler(travelerController.createTravelRequest)
    );

    this.router.get("/traveler/travel-requests",
      authenticate(["user"]),
      asyncHandler(travelerController.getTravelRequests)
    );

    this.router.get("/traveler/travel-requests/:id",
      authenticate(["user"]),
      asyncHandler(travelerController.getTravelRequestById)
    );

  }
}