import { Request, Response, NextFunction } from "express";
import { IGetWorkerOverviewUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerOverviewUseCase";
import { AppError } from "@/Domain/utils/customError";
import { inject, injectable } from "tsyringe";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { IUpdateWorkerKycStatusUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IUpdateWorkerKycStatusUseCase";
import { UpdateWorkerKycStatusDTO } from "@/Application/Dto/Workers/worker.dto";

@injectable()
export class AgencyHubWorkerController {
    constructor(
        @inject("IGetWorkerOverviewUseCase") private _getWorkerOverviewUseCase: IGetWorkerOverviewUseCase,
        @inject("IUpdateWorkerKycStatusUseCase") private _updateWorkerKycStatusUseCase: IUpdateWorkerKycStatusUseCase,
    ) { }

    getHubWorkerById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const workerId = req.params.id;
            if (!workerId) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

            const worker = await this._getWorkerOverviewUseCase.execute(workerId);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    WORKER_MESSAGES.OVERVIEW_FETCHED,
                    worker
                )
            );
        } catch (error) {
            next(error)
        }
    }

    updateWorkerKycStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const workerId = req.params.id;
            if (!workerId) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
            const dto = req.body as UpdateWorkerKycStatusDTO

            await this._updateWorkerKycStatusUseCase.execute(workerId, dto);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    WORKER_MESSAGES.KYC_UPDATED,
                )
            );

        } catch (error) {
            next(error)
        }
    }
}