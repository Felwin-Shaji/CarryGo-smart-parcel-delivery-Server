import { inject, injectable } from "tsyringe";
import type { Response, Request } from "express";
import { IAdminHubController } from "../../Interfaces/Controllers/Admin/IAdminHubController";
import { IGetHubOverviewUseCase } from "../../../Application/Interfaces/UseCases/Hub/IGetHubOverviewUseCase";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessage";
import { updateHubKycStatusDTO } from "../../../Application/DTOs/Hub/hub.dto";
import { IUpdateHubKycStatusUseCase } from "../../../Application/Interfaces/UseCases/Hub/IUpdateHubKycStatusUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessage";
import { IGetWorkerOverviewUseCase } from "../../../Application/Interfaces/UseCases/Worker/IGetWorkerOverviewUseCase";

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