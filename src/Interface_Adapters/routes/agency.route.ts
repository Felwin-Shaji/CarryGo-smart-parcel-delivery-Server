import { agencyController } from "../../Infrastructure/di/resolver";
import { agencyuploadKYC } from "../../Infrastructure/services/storage/multer";
import { authenticate } from "../middlewares/authenticate.middleware";
import { asyncHandler } from "../middlewares/ErrorHandlers/asyncHandler";
import { BaseRoute } from "./base.route";

export class AgencyRoute extends BaseRoute{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post("/kyc-varification",authenticate(["agency"]),agencyuploadKYC,asyncHandler(agencyController.submitKYC))
    }

}