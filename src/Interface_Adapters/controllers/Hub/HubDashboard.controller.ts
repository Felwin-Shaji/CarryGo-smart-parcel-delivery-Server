import { IGetHubDashboardShipmentsPreviewUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardShipmentsPreviewUseCase";
import { IGetHubDashboardSummaryUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardSummaryUseCase";
import { IGetHubDashboardTrendUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardTrendUseCase";
import { IGetHubDashboardTypesUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardTypesUseCase";
import { Role } from "@/Domain/Enums/Roles";
import { AppError } from "@/Domain/utils/customError";
import { HUB_MESSAGES } from "@/Infrastructure/constants/messages/hubMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class HubDashboardController {
    constructor(
        @inject("IGetHubDashboardSummaryUseCase") private _getHubDashboardSummaryUseCase: IGetHubDashboardSummaryUseCase,
        @inject("IGetHubDashboardTrendUseCase") private _getHubDashboardTrendUseCase: IGetHubDashboardTrendUseCase,
        @inject("IGetHubDashboardTypesUseCase") private _getHubDashboardTypesUseCase: IGetHubDashboardTypesUseCase,
        @inject("IGetHubDashboardShipmentsPreviewUseCase") private _getHubDashboardShipmentsPreviewUseCase: IGetHubDashboardShipmentsPreviewUseCase,
    ) { };

    getSummary = async (req: Request, res: Response): Promise<Response | void> => {

        let hubId: string | undefined;
        if (req.user?.role === Role.HUB) hubId = req.user.id;
        else hubId = req.params.hubId as string;

        if (!hubId) throw new AppError(HUB_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const summery = await this._getHubDashboardSummaryUseCase.execute(hubId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.DAHSBOARD_SUMMERY_FETCHED,
                summery
            )
        );
    };

    getTrend = async (req: Request, res: Response) => {

        let hubId: string | undefined;
        if (req.user?.role === Role.HUB) hubId = req.user.id;
        else hubId = req.params.hubId as string;

        if (!hubId) throw new AppError(HUB_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const { from, to } = req.query;

        const data = await this._getHubDashboardTrendUseCase.execute(hubId, {
            from: from as string,
            to: to as string,
        });

        return res.status(200).json(
            ApiResponse.success(
                HUB_MESSAGES.DAHSBOARD_TREND_FETCHED,
                data
            )
        );
    };

    getTypes = async (req: Request, res: Response) => {

        let hubId: string | undefined;
        if (req.user?.role === Role.HUB) hubId = req.user.id;
        else hubId = req.params.hubId as string;

        if (!hubId) throw new AppError(HUB_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const data = await this._getHubDashboardTypesUseCase.execute(hubId);

        return res.status(200).json(
            ApiResponse.success(
                HUB_MESSAGES.DAHSBOARD_TYPE_FETCHED,
                data
            )
        );
    };

    getShipmentsPreview = async (req: Request, res: Response): Promise<Response | void> => {

        let hubId: string | undefined;
        if (req.user?.role === Role.HUB) hubId = req.user.id;
        else hubId = req.params.hubId as string;
        
        if (!hubId) throw new AppError(HUB_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const data = await this._getHubDashboardShipmentsPreviewUseCase.execute(hubId);

        res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.DAHSBOARD_SHIPMENT_FETCHED,
                data
            )
        );
    };
}