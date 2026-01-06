import { inject, injectable } from "tsyringe";
import { IAgencyPricingController } from "../../Interface/Controllers_Interfaces/Agency_Interfases/IAgencyPricingController";
import { IGetAgencyPricingUsecase } from "../../../Application/interfaces/useCase_Interfaces/Princing/IGetAgencyPricingUsecase";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { IUpsertAgencyPricingUseCase } from "../../../Application/interfaces/useCase_Interfaces/Princing/IUpsertAgencyPricingUseCase";
import { UpdateAgencyPricingDTO } from "../../../Application/Dto/Pricing/AgencyPricing.dto";

@injectable()
export class AgencyPricingController implements IAgencyPricingController {
    constructor(
        @inject("IGetAgencyPricingUsecase") private _getAgencyPricingUsecase: IGetAgencyPricingUsecase,
        @inject("IUpsertAgencyPricingUseCase") private _upsertAgencyPricingUseCase: IUpsertAgencyPricingUseCase
    ) { }
    getAgencyPricing = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const agencyId = req.user?.id;
            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

            const agencyPricing = await this._getAgencyPricingUsecase.execute(agencyId);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    PRICING_POLICY_MESSAGE.FETCH_AGENCY_PRICING_SUCCESS,
                    agencyPricing
                )
            );

        } catch (error) {
            next(error)
        }
    };

    upsertAgencyPricing = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const agencyId = req.user?.id;
            const dto = req.body as UpdateAgencyPricingDTO
            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

            const agencyPricing = await this._upsertAgencyPricingUseCase.execute(agencyId, dto);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    PRICING_POLICY_MESSAGE.FETCH_AGENCY_PRICING_SUCCESS,
                    agencyPricing
                )
            );
        } catch (error) {
            next(error)
        }
    };
}