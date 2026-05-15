import { inject, injectable } from "tsyringe";
import type { Response, Request } from "express";
import { IAdminHubController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/IAdminHubController";
import { IGetHubOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IGetHubOverviewUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { updateHubKycStatusDTO } from "../../../Application/Dto/Hub/hub.dto";
import { IUpdateHubKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IUpdateHubKycStatusUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { IGetWorkerOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkerOverviewUseCase";

@injectable()
export class AdminHubController implements IAdminHubController {
    constructor(
        @inject("IGetHubOverviewUseCase") private _getHubOverviewUseCase: IGetHubOverviewUseCase,
        @inject("IUpdateHubKycStatusUseCase") private _updateHubKycStatusUseCase: IUpdateHubKycStatusUseCase,
        @inject("IGetWorkerOverviewUseCase") private _getWorkerOverviewUseCase: IGetWorkerOverviewUseCase,
    ) { };

    getHubById = async (req: Request, res: Response): Promise<Response | void> => {

        const hubId = req.params.id as string;

        const hubOverview = await this._getHubOverviewUseCase.execute(hubId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.FETCH_SUCCESS,
                hubOverview
            )
        );
    };

    updateHubKyc = async (req: Request, res: Response): Promise<Response | void> => {

        const hubId = req.params?.id;
        const dto = req.body as updateHubKycStatusDTO;

        if (!hubId) throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.BAD_REQUEST)

        await this._updateHubKycStatusUseCase.execute(hubId, dto)

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.STATUS_UPDATED
            )
        );
    }

    getHubWorkerById = async (req: Request, res: Response): Promise<Response | void> => {

        const workerId = req.params.id;
        if (!workerId) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const worker = await this._getWorkerOverviewUseCase.execute(workerId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WORKER_MESSAGES.OVERVIEW_FETCHED,
                worker
            )
        );
    }
}