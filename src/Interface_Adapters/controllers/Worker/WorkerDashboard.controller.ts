import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { IGetWorkerParcelsUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerParcelsUseCase";
import { USER_MESSAGES } from "@/Infrastructure/constants/messages/userMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { AppError } from "@/Domain/utils/customError";
import { GetWorkerGraphRequestDTO, GetWorkerParcelsDTO } from "@/Application/Dto/Workers/worker.dto";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { IGetWorkerDashboardUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerDashboardUseCase";
import { IGetWorkerGraphUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerGraphUseCase";


@injectable()
export class WorkerDashboardController {

    constructor(
        @inject("IGetWorkerParcelsUseCase") private _getWorkerParcelsUseCase: IGetWorkerParcelsUseCase,
        @inject("IGetWorkerDashboardUseCase") private _getWorkerDashboardUseCase: IGetWorkerDashboardUseCase,
        @inject("IGetWorkerGraphUseCase") private _getWorkerGraphUseCase: IGetWorkerGraphUseCase,
    ) { }
    workerParcels = async (req: Request, res: Response): Promise<Response | void> => {

        const workerId = req.user?.id;
        if (!workerId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const dto = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            status: req.query.status?.toString() || "",
            fromDate: req.query.fromDate?.toString(),
            toDate: req.query.toDate?.toString(),
        } as GetWorkerParcelsDTO;

        const response = await this._getWorkerParcelsUseCase.execute(workerId, dto);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.PARCELS_FETCHED,
                response
            )
        );
    };

    getWorkerDashboard = async (req: Request, res: Response): Promise<Response | void> => {

        const workerId = req.user?.id;
        if (!workerId) {
            throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);
        }

        const response = await this._getWorkerDashboardUseCase.execute(workerId);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.DASHBOARD_FETCHED,
                response
            )
        );
    };

    getWorkerGraph = async (req: Request, res: Response): Promise<Response | void> => {
        const workerId = req.user?.id;
        if (!workerId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const dto = {
            status: req.query.status?.toString() || "",
            fromDate: req.query.fromDate?.toString(),
            toDate: req.query.toDate?.toString(),
        } as GetWorkerGraphRequestDTO;

        const response = await this._getWorkerGraphUseCase.execute(workerId, dto);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.DASHBOARD_FETCHED,
                response
            )
        );
    };

    getWorkerParcelsByWorkerId = async (req: Request, res: Response): Promise<Response | void> => {

        const workerId = req.params.workerId as string;
        if (!workerId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const dto = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            status: req.query.status?.toString() || "",
            fromDate: req.query.fromDate?.toString(),
            toDate: req.query.toDate?.toString(),
        } as GetWorkerParcelsDTO;

        const response = await this._getWorkerParcelsUseCase.execute(workerId, dto);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.PARCELS_FETCHED,
                response
            )
        );
    };

    getWorkerDashboardByWorkerId = async (req: Request, res: Response): Promise<Response | void> => {

        const workerId = req.params.workerId as string;
        if (!workerId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const response = await this._getWorkerDashboardUseCase.execute(workerId);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.DASHBOARD_FETCHED,
                response
            )
        );
    };

    getWorkerGraphByWorkerId = async (req: Request, res: Response): Promise<Response | void> => {

        const workerId = req.params.workerId as string;
        if (!workerId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const dto = {
            status: req.query.status?.toString() || "",
            fromDate: req.query.fromDate?.toString(),
            toDate: req.query.toDate?.toString(),
        } as GetWorkerGraphRequestDTO;

        const response = await this._getWorkerGraphUseCase.execute(workerId, dto);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.DASHBOARD_FETCHED,
                response
            )
        );
    };
}