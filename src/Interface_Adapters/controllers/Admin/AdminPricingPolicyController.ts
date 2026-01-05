import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IAdminPricingPolicyController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/adminPricingPolicy.controller";
import { IGetPricingUseCase } from "../../../Application/interfaces/useCase_Interfaces/Admin_Pricing_Policy/getPricing.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/constants/messages/pricingPolicyMessage";

@injectable()
export class AdminPricingPolicyController implements IAdminPricingPolicyController {
    constructor(
        @inject("IGetPricingUseCase") private _getPricingUseCase: IGetPricingUseCase
    ) { }
    getAdminPricing = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        const prining = await this._getPricingUseCase.execute("AGENCY");
        console.log(prining)

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                PRICING_POLICY_MESSAGE.FETCH_PRICING_POLICY_SUCCESS,
                prining
            )
        );
    }
};