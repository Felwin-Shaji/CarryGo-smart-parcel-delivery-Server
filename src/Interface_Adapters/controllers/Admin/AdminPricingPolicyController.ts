import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IAdminPricingPolicyController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/adminPricingPolicy.controller";
import { IGetPricingUseCase } from "../../../Application/interfaces/useCase_Interfaces/Princing/getPricing.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { AdminPricingRequestDTO } from "../../../Application/Dto/Pricing/adminPricing.dto";
import { ICreateAdminPricingPolicyUseCase } from "../../../Application/interfaces/useCase_Interfaces/Princing/ICreateAdminPricingPolicyUseCase";

@injectable()
export class AdminPricingPolicyController implements IAdminPricingPolicyController {
    constructor(
        @inject("IGetPricingUseCase") private _getPricingUseCase: IGetPricingUseCase,
        @inject("ICreateAdminPricingPolicyUseCase") private _createAdminPricingPolicyUseCase: ICreateAdminPricingPolicyUseCase,
    ) { }
    getAdminPricing = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {
            const pricing = await this._getPricingUseCase.execute("AGENCY");

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    PRICING_POLICY_MESSAGE.FETCH_PRICING_POLICY_SUCCESS,
                    pricing
                )
            );

        } catch (error) {
            next(error);
        };
    }

    createAdminPricing = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const dto = req.body as AdminPricingRequestDTO;

            const newPolicy = await this._createAdminPricingPolicyUseCase.execute(dto);

            return res.status(STATUS.CREATED).json(
                ApiResponse.success(
                    PRICING_POLICY_MESSAGE.CREATE_PRICING_POLICY_SUCCESS,
                    newPolicy
                )
            );

        } catch (error) {
            next(error);
        }
    }
};