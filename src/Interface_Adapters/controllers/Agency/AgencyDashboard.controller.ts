import { IAgencyExportSalesReportUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/IAgencyExportSalesReportUsecase";
import { IAgencyGetDeliveriesChartUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/IAgencyGetDeliveriesChartUseCase";
import { IAgencyGetSalesChartUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/IAgencyGetSalesChartUseCase";
import { IAgencyGetSalesReportUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/IAgencyGetSalesReportUseCase";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAgencyGetDashboardUsecase } from "../../../Application/interfaces/useCase_Interfaces/Agency/IAgencyGetDashboardUseCase";
import { SalesReportRequestDTO } from "../../../Application/Dto/Agency/agencyDashboard.dto";
import { ApiResponse } from "../../presenters/ApiResponse";
import { AppError } from "../../../Domain/utils/customError";

@injectable()
export class AgencyDashboardController {
    constructor(
        @inject('IAgencyGetDashboardUsecase') private _getDashboardUsecase: IAgencyGetDashboardUsecase,
        @inject('IAgencyGetSalesReportUseCase') private _getAgencySalesReportUseCase: IAgencyGetSalesReportUseCase,
        @inject('IAgencyGetSalesChartUseCase') private _getAgencySalesChartUseCase: IAgencyGetSalesChartUseCase,
        @inject('IAgencyGetDeliveriesChartUseCase') private _getAgencyDeliveriesChartUseCase: IAgencyGetDeliveriesChartUseCase,
        @inject('IAgencyExportSalesReportUseCase') private _exportSalesReportUseCase: IAgencyExportSalesReportUseCase,
    ) { };

    getDashboard = async (req: Request, res: Response) => {
        const agencyId = req.user?.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const dashboardData = await this._getDashboardUsecase.execute(agencyId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.DASHBOARD_FETCH_SUCCESS,
                dashboardData
            )
        );
    };

    getDashboardById = async (req: Request, res: Response) => {
        const agencyId = req.params.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const dashboardData = await this._getDashboardUsecase.execute(agencyId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.DASHBOARD_FETCH_SUCCESS,
                dashboardData
            )
        );
    };

    getSalesReport = async (req: Request, res: Response) => {
        const agencyId = req.user?.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const dto = req.query as SalesReportRequestDTO;

        const data = await this._getAgencySalesReportUseCase.execute(agencyId, dto);

        res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.SALES_REPORT_FETCH_SUCCESS,
                data
            )
        );
    };

    getSalesReportById = async (req: Request, res: Response) => {
        const agencyId = req.params.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const dto = req.query as SalesReportRequestDTO;

        const data = await this._getAgencySalesReportUseCase.execute(agencyId, dto);

        res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.SALES_REPORT_FETCH_SUCCESS,
                data
            )
        );
    };


    getSalesChart = async (req: Request, res: Response) => {
        const agencyId = req.user?.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const data = await this._getAgencySalesChartUseCase.execute(
            agencyId,
            req.query
        );

        res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.SALES_CHART_FETCH_SUCCESS,
                data
            )
        );
    };

    getSalesChartById = async (req: Request, res: Response) => {
        const agencyId = req.params.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const data = await this._getAgencySalesChartUseCase.execute(
            agencyId,
            req.query
        );

        res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.SALES_CHART_FETCH_SUCCESS,
                data
            )
        );
    };

    getDeliveriesChart = async (req: Request, res: Response) => {
        const agencyId = req.user?.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const data = await this._getAgencyDeliveriesChartUseCase.execute(
            agencyId,
            req.query
        );

        res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.DELIVERIES_CHART_FETCH_SUCCESS,
                data
            )
        );
    };

    getDeliveriesChartById = async (req: Request, res: Response) => {
        const agencyId = req.params.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const data = await this._getAgencyDeliveriesChartUseCase.execute(
            agencyId,
            req.query
        );

        res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.DELIVERIES_CHART_FETCH_SUCCESS,
                data
            )
        );
    };


    exportSalesReport = async (req: Request, res: Response) => {
        const agencyId = req.user?.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const data = await this._exportSalesReportUseCase.execute(agencyId, req.query as SalesReportRequestDTO);

        res.setHeader('Content-Disposition', `attachment; filename="${data.fileName}"`);
        res.setHeader('Content-Type', data.mimeType);
        res.status(STATUS.OK).send(data.file);
    };


    exportSalesReportById = async (req: Request, res: Response) => {
        const agencyId = req.params?.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING);

        const data = await this._exportSalesReportUseCase.execute(agencyId, req.query as SalesReportRequestDTO);

        res.setHeader('Content-Disposition', `attachment; filename="${data.fileName}"`);
        res.setHeader('Content-Type', data.mimeType);
        res.status(STATUS.OK).send(data.file);
    };
};