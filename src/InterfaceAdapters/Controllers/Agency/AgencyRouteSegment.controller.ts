import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { IGetRouteGroupDetailUseCase } from "../../../Application/Interfaces/UseCases/Logistics/RouteGroup/IGetRouteDetailsUseCase";
import { ICreateRouteSegmentUseCase } from "../../../Application/Interfaces/UseCases/Logistics/RouteGroup/ICreateRouteSegmentUseCase";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ROUTE_GROUP_MESSAGE, ROUTE_SEGMENT_MESSAGE } from "../../../Infrastructure/Constants/Messages/RouteGroupMessage";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { IUpdateRouteGroupStatusUseCase } from "../../../Application/Interfaces/UseCases/Logistics/RouteGroup/IUpdateRouteGroupStatusUseCase";

@injectable()
export class AgencyRouteSegmentController {
    constructor(
        @inject("IGetRouteGroupDetailUseCase") private _getRouteGroupDetail: IGetRouteGroupDetailUseCase,
        @inject("ICreateRouteSegmentUseCase") private _createSegment: ICreateRouteSegmentUseCase,
        @inject("IUpdateRouteGroupStatusUseCase") private _updateRouteGroupStatus: IUpdateRouteGroupStatusUseCase
    ) { }


    getRouteGroupDetail = async (req: Request, res: Response): Promise<Response | void> => {

        const agencyId = req.user?.id;
        const { routeGroupId } = req.params;

        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
        if (!routeGroupId) throw new AppError(ROUTE_GROUP_MESSAGE.ID_MISSING, STATUS.BAD_REQUEST);

        const result = await this._getRouteGroupDetail.execute(routeGroupId, agencyId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                ROUTE_GROUP_MESSAGE.DETAIL_FETCHED,
                result
            )
        );

    };

    createSegment = async (req: Request, res: Response): Promise<Response | void> => {

        const agencyId = req.user?.id;
        const { routeGroupId } = req.params;

        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
        if (!routeGroupId) throw new AppError(ROUTE_GROUP_MESSAGE.ID_MISSING, STATUS.BAD_REQUEST);

        await this._createSegment.execute(routeGroupId, agencyId, req.body);

        return res.status(STATUS.CREATED).json(
            ApiResponse.success(
                ROUTE_SEGMENT_MESSAGE.CREATED
            )
        );
    };

    updateRouteGroupStatus = async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {

        const agencyId = req.user?.id;
        const { id } = req.params;
        const { isActive } = req.body;

        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
        if (!id) throw new AppError(ROUTE_GROUP_MESSAGE.ID_MISSING, STATUS.BAD_REQUEST);

        await this._updateRouteGroupStatus.execute(
            id,
            agencyId,
            isActive
        );

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                ROUTE_GROUP_MESSAGE.STATUS_UPDATED
            )
        );
    };
}