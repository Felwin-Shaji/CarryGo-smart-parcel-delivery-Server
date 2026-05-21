import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { ADMIN_MESSAGES } from "../../../Infrastructure/constants/messages/adminMessages";
import { IGetAdminDashboardOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminDashboardOverviewUseCase";
import { GetAdminDashboardDTO } from "../../../Application/Dto/Admin/adminDashboard.dto";
import { IGetAdminRevenueChartUseCase } from "../../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminRevenueChartUseCase";
import { IGetAdminBookingsChartUseCase } from "../../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminBookingsChartUseCase";
import { IGetAdminBookingsReportUseCase } from "../../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminBookingsReportUseCase";
import { IExportAdminBookingsReportUseCase } from "../../../Application/interfaces/useCase_Interfaces/Admin/IExportAdminBookingsReportUseCase";

@injectable()
export class AdminDashboardController {

    constructor(
        @inject("IGetAdminDashboardOverviewUseCase") private _getAdminDashboardOverviewUseCase: IGetAdminDashboardOverviewUseCase,

        @inject("IGetAdminRevenueChartUseCase") private _getAdminRevenueChartUseCase: IGetAdminRevenueChartUseCase,

        @inject("IGetAdminBookingsChartUseCase") private _getAdminBookingsChartUseCase: IGetAdminBookingsChartUseCase,

        @inject("IGetAdminBookingsReportUseCase") private _getAdminBookingsReportUseCase: IGetAdminBookingsReportUseCase,

        @inject("IExportAdminBookingsReportUseCase") private _exportAdminBookingsReportUseCase: IExportAdminBookingsReportUseCase,
    ) { }


    getDashboardOverview = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.query
        const result = await this._getAdminDashboardOverviewUseCase.execute(dto as GetAdminDashboardDTO);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                ADMIN_MESSAGES.OVERVIEW_FETCH_SUCCESS,
                result
            )
        );
    };

    getRevenueChart = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.query
        const result = await this._getAdminRevenueChartUseCase.execute(dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                ADMIN_MESSAGES.REVENUE_CHART_FETCH_SUCCESS,
                result
            )
        );
    };

    getBookingsChart = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.query
        const result = await this._getAdminBookingsChartUseCase.execute(dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                ADMIN_MESSAGES.BOOKINGS_CHART_FETCH_SUCCESS,
                result
            )
        );
    };

    getBookingsReport = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.query
        const result = await this._getAdminBookingsReportUseCase.execute(dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                ADMIN_MESSAGES.BOOKINGS_REPORT_FETCH_SUCCESS,
                result
            )
        );
    };

    exportBookingsReport = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.query
        const result = await this._exportAdminBookingsReportUseCase.execute(dto);

        res.setHeader("Content-Type", result.mimeType);
        res.setHeader("Content-Disposition", `attachment; filename=${result.fileName}`);

        return res.send(result.file);
    };


}