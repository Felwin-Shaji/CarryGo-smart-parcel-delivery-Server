import { Request, Response, NextFunction } from "express";
import { IAgencyRouteController } from "../../Interface/Controllers_Interfaces/Agency_Interfases/IAgencyRouteController";
import { inject, injectable } from "tsyringe";
import { CreateRouteGroupRequestDTO, RouteGroupFilterRequestDTO, RouteGroupPaginationRequestDTO } from "../../../Application/Dto/Agency/agencyRouteGroup.dto";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ICreateRouteGroupUseCase } from "../../../Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/ICreateRouteGroupUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { ApiResponse } from "../../presenters/ApiResponse";
import { ROUTE_GROUP_MESSAGE } from "../../../Infrastructure/constants/messages/RouteGroupMessage";
import { IGetPaginatedRouteGroupUseCase } from "../../../Application/interfaces/useCase_Interfaces/Logistics/RouteGroup/IGetPaginatedRouteGroupUseCase";

@injectable()
export class AgencyRouteController implements IAgencyRouteController {
    constructor(
        @inject("ICreateRouteGroupUseCase") private _createRouteGroupUseCase: ICreateRouteGroupUseCase,
        @inject("IGetPaginatedRouteGroupUseCase") private _getPaginatedRouteGroupUseCase: IGetPaginatedRouteGroupUseCase
    ) { }

    createRouteGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const dto = req.body as CreateRouteGroupRequestDTO
            const agencyId = req.user?.id;
            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST)


            await this._createRouteGroupUseCase.execute(agencyId, dto);

            return res.status(STATUS.CREATED).json(
                ApiResponse.success(
                    ROUTE_GROUP_MESSAGE.CREATED
                )
            )

        } catch (error) {
            next(error)
        }
    }

    getPaginateRouteGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const agencyId = req.user?.id;
            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

            const options: RouteGroupPaginationRequestDTO = {
                page: parseInt(req.query.page as string) || 1,
                limit: parseInt(req.query.limit as string) || 9,
                filters: req.query.filter as RouteGroupFilterRequestDTO
            }

            const result = await this._getPaginatedRouteGroupUseCase.execute(agencyId, options);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    ROUTE_GROUP_MESSAGE.LISTED,
                    result
                )
            )

        } catch (error) {
            next(error)
        }
    }
}