import { agencyController, agencyHubController } from "../../Infrastructure/di/resolver";
import { agencyAddHub, agencyuploadKYC } from "../../Infrastructure/services/storage/multer";
import { authenticate } from "../middlewares/AuthMiddleware/authenticate.middleware";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "./base.route";

export class AgencyRoute extends BaseRoute{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/kyc-varification",authenticate(["agency"]),agencyuploadKYC,asyncHandler(agencyController.submitKYC))
        // this.router.get("/agency",authenticate(["agency"]),asyncHandler(agencyController.submitKYC))

        this.router.post("/add-newHub",authenticate(["agency"]),agencyAddHub,asyncHandler(agencyHubController.addNewHub));
    }

}