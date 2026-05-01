import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAdminPricingPolicyController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/adminPricingPolicy.controller";
import { IGetPricingUseCase } from "../../../Application/interfaces/useCase_Interfaces/Princing/getPricing.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { AdminPricingRequestDTO, AdminTravelerPricingRequestDTO } from "../../../Application/Dto/Pricing/adminPricing.dto";
import { ICreateAdminPricingPolicyUseCase } from "../../../Application/interfaces/useCase_Interfaces/Princing/ICreateAdminPricingPolicyUseCase";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";
import { ICreateAdminTravelerPricingUsecase } from "../../../Application/interfaces/useCase_Interfaces/Princing/ICreateAdminTravelerPricingUsecase";

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