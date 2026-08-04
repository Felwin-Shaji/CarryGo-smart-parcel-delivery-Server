import { inject, injectable } from "tsyringe";
import { IAgencyPricingController } from "../../Interfaces/Controllers/Agency/IAgencyPricingController";
import { IGetAgencyPricingUsecase } from "../../../Application/Interfaces/UseCases/Pricing/IGetAgencyPricingUseCase";
import { Request, Response } from "express";
import { AppError } from "../../../Domain/Utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/Constants/Messages/pricingPolicyMessage";
import { IUpsertAgencyPricingUseCase } from "../../../Application/Interfaces/UseCases/Pricing/IUpsertAgencyPricingUseCase";
import { UpdateAgencyPricingDTO } from "../../../Application/DTOs/Pricing/AgencyPricingDTO";

@injectable()
export class AgencyPricingController implements IAgencyPricingController {
    constructor(
        @inject("IGetAgencyPricingUsecase") private _getAgencyPricingUsecase: IGetAgencyPricingUsecase,
        @inject("IUpsertAgencyPricingUseCase") private _upsertAgencyPricingUseCase: IUpsertAgencyPricingUseCase
    ) { }
    getAgencyPricing = async (req: Request, res: Response): Promise<Response | void> => {
        const agencyId = req.user?.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const agencyPricing = await this._getAgencyPricingUsecase.execute(agencyId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                PRICING_POLICY_MESSAGE.FETCH_AGENCY_PRICING_SUCCESS,
                agencyPricing
            )
        );

    };

    upsertAgencyPricing = async (req: Request, res: Response): Promise<Response | void> => {
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
    };
}