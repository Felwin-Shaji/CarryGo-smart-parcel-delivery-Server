import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { ReorderSegmentDTO } from "@/Application/Dto/Agency/agencyRouteSegment.dto";
import { IGetRouteGroupDetailUseCase } from "@/Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/IGetRouteDetailsUsecase";
import { ICreateRouteSegmentUseCase } from "@/Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/ICreateRouteSegmentUseCase";
import { AGENCY_MESSAGES } from "@/Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ROUTE_GROUP_MESSAGE, ROUTE_SEGMENT_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";

@injectable()
export class AgencyRouteSegmentController {
    constructor(
        @inject("IGetRouteGroupDetailUseCase") private _getRouteGroupDetail: IGetRouteGroupDetailUseCase,
        @inject("ICreateRouteSegmentUseCase") private _createSegment: ICreateRouteSegmentUseCase,
    ) { }


    getRouteGroupDetail = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
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
        } catch (error) {
            next(error);
        }
    };

    createSegment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
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
        } catch (error) {
            next(error);
        }
    };
}