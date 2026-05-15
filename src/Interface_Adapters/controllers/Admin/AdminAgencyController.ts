import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetAgenciesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/GetAgenciesUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { IUpdateAgencyKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAdminAgencyController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/adminAgency.controller";
import { IUpdateAgencyStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyStatusUseCase";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { GetAgenciesDTO, updateAgencyKycStatusDTO, } from "../../../Application/Dto/Agency/agency.dto";
import { ApiResponse } from "../../presenters/ApiResponse";
import { IGetAgencyOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/GetAgencyOverview.usecase";
import { parseBlockedQuery } from "../../../Domain/utils/utils";


@injectable()
export class AdminAgencyController implements IAdminAgencyController {

    constructor(
        @inject("IGetAgenciesUseCase") private _getAgenciesUseCase: IGetAgenciesUseCase,
        @inject("IGetAgencyOverviewUseCase") private _getAgencyOverviewUseCase: IGetAgencyOverviewUseCase,
        @inject("IUpdateAgencyKycStatusUseCase") private _updateAgencyKycStatusUseCase: IUpdateAgencyKycStatusUseCase,
        @inject("IUpdateAgencyStatusUseCase") private _updateAgencyStatusUseCase: IUpdateAgencyStatusUseCase
    ) { }

    getAgencies = async (req: Request, res: Response): Promise<Response | void> => {

        const dto: GetAgenciesDTO = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: req.query.search?.toString() || "",
            sortBy: req.query.sortBy?.toString() || "createdAt",
            sortOrder: req.query.sortOrder === "desc" ? "desc" : "asc",
            blocked: parseBlockedQuery(req.query.blocked),
            kycStatus: req.query.kycStatus?.toString() || "",
            startDate: req.query.startDate?.toString() || "",
            endDate: req.query.endDate?.toString() || "",
        };

        const result = await this._getAgenciesUseCase.execute(dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.LIST_FETCH_SUCCESS,
                result,
            )
        );
    };

    getAgencyById = async (req: Request, res: Response): Promise<Response | void> => {

        const agencyId = req.params.id;
        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const result = await this._getAgencyOverviewUseCase.execute(agencyId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.FETCH_AGENCY_WITH_KYC,
                result
            )
        );

    };

    updateAgencyKyc = async (req: Request, res: Response): Promise<Response | void> => {

        const agencyId = req.params.id;
        const dto = req.body as updateAgencyKycStatusDTO;

        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
        const agencyStatus = await this._updateAgencyKycStatusUseCase.execute(agencyId, dto)

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.KYC_STATUS_UPDATED, agencyStatus
            )
        )
    }

    updateAgencyStatus = async (req: Request, res: Response): Promise<Response | void> => {
        const agencyId = req.params.id;
        const { isBlocked } = req.body;

        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        await this._updateAgencyStatusUseCase.execute(agencyId, isBlocked);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.STATUS_UPDATED,
            )
        )
    }
}
