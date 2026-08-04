import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAdminPricingPolicyController } from "../../Interfaces/Controllers/Admin/adminPricingPolicy.controller";
import { IGetPricingUseCase } from "../../../Application/Interfaces/UseCases/Pricing/getPricing.usecase";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/Constants/Messages/pricingPolicyMessage";
import { AdminPricingRequestDTO, AdminTravelerPricingRequestDTO } from "../../../Application/DTOs/Pricing/adminPricing.dto";
import { ICreateAdminPricingPolicyUseCase } from "../../../Application/Interfaces/UseCases/Pricing/ICreateAdminPricingPolicyUseCase";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";
import { ICreateAdminTravelerPricingUsecase } from "../../../Application/Interfaces/UseCases/Pricing/ICreateAdminTravelerPricingUsecase";

@injectable()
export class AdminPricingPolicyController implements IAdminPricingPolicyController {
    constructor(
        @inject("IGetPricingUseCase") private _getPricingUseCase: IGetPricingUseCase,
        @inject("ICreateAdminPricingPolicyUseCase") private _createAdminPricingPolicyUseCase: ICreateAdminPricingPolicyUseCase,
        @inject("ICreateAdminTravelerPricingUsecase") private _createAdminTravelerPricingUsecase: ICreateAdminTravelerPricingUsecase,
    ) { }
    getAdminAgencyPricing = async (req: Request, res: Response): Promise<Response | void> => {

        const pricing = await this._getPricingUseCase.execute(DeliveryPartner.AGENCY);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                PRICING_POLICY_MESSAGE.FETCH_PRICING_POLICY_SUCCESS,
                pricing
            )
        );
    }

    createAdminAgencyPricing = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as AdminPricingRequestDTO;

        const newPolicy = await this._createAdminPricingPolicyUseCase.execute(dto);

        return res.status(STATUS.CREATED).json(
            ApiResponse.success(
                PRICING_POLICY_MESSAGE.CREATE_PRICING_POLICY_SUCCESS,
                newPolicy
            )
        );
    }

    getAdminTravelerPricing = async (req: Request, res: Response): Promise<Response | void> => {

        const pricing = await this._getPricingUseCase.execute(DeliveryPartner.TRAVELER);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                PRICING_POLICY_MESSAGE.FETCH_PRICING_POLICY_SUCCESS,
                pricing
            )
        );
    };

    createAdminTravelerPricing = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as AdminTravelerPricingRequestDTO

        const newPolicy = await this._createAdminTravelerPricingUsecase.execute(dto);

        return res.status(STATUS.CREATED).json(
            ApiResponse.success(
                PRICING_POLICY_MESSAGE.CREATE_PRICING_POLICY_SUCCESS,
                newPolicy
            )
        );
    }
};