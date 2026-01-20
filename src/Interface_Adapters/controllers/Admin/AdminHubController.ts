import { inject, injectable } from "tsyringe";
import type { Response, Request, NextFunction } from "express";
import { IAdminHubController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/IAdminHubController";
import { IGetHubOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IGetHubOverviewUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { updateHubKycStatusDTO } from "../../../Application/Dto/Hub/hub.dto";
import { IUpdateHubKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IUpdateHubKycStatusUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { STATES } from "mongoose";

@injectable()
export class AdminHubController implements IAdminHubController {
    constructor(
        @inject("IGetHubOverviewUseCase") private _getHubOverviewUseCase: IGetHubOverviewUseCase,
        @inject("IUpdateHubKycStatusUseCase") private _updateHubKycStatusUseCase: IUpdateHubKycStatusUseCase,
    ) { };

    getHubById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const hubId = req.params.id as string;

            const hubOverview = await this._getHubOverviewUseCase.execute(hubId);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    HUB_MESSAGES.FETCH_SUCCESS,
                    hubOverview
                )
            )
        } catch (error) {
            next(error)
        }
    };

    updateHubKyc = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const hubId = req.params?.id;
            const dto = req.body as updateHubKycStatusDTO;

            if(!hubId) throw new AppError(HUB_MESSAGES.NOT_FOUND,STATUS.BAD_REQUEST)

            await this._updateHubKycStatusUseCase.execute(hubId,dto )

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    HUB_MESSAGES.STATUS_UPDATED
                )
            )

        } catch (error) {
            next(error)
        }
    }

}