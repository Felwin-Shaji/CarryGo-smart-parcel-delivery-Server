import { Request, Response } from "express";
import { IGetWorkerOverviewUseCase } from "../../../Application/Interfaces/UseCases/Worker/IGetWorkerOverviewUseCase";
import { inject, injectable } from "tsyringe";
import { IUpdateWorkerKycStatusUseCase } from "../../../Application/Interfaces/UseCases/Worker/IUpdateWorkerKycStatusUseCase";
import { UpdateWorkerKycStatusDTO } from "../../../Application/DTOs/Worker/WorkerDTO";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { AppError } from "../../../Domain/Utils/customError";


@injectable()
export class AgencyHubWorkerController {
    constructor(
        @inject("IGetWorkerOverviewUseCase") private _getWorkerOverviewUseCase: IGetWorkerOverviewUseCase,
        @inject("IUpdateWorkerKycStatusUseCase") private _updateWorkerKycStatusUseCase: IUpdateWorkerKycStatusUseCase,
    ) { }

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

    updateWorkerKycStatus = async (req: Request, res: Response): Promise<Response | void> => {

        const workerId = req.params.id;
        if (!workerId) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
        const dto = req.body as UpdateWorkerKycStatusDTO

        await this._updateWorkerKycStatusUseCase.execute(workerId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WORKER_MESSAGES.KYC_UPDATED,
            )
        );
    }
}