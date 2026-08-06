import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetAgenciesUseCase } from "../../../Application/Interfaces/UseCases/Agency/IGetAgenciesUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { IUpdateAgencyKycStatusUseCase } from "../../../Application/Interfaces/UseCases/Agency/IUpdateAgencyKycStatusUseCase";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IAdminAgencyController } from "../../Interfaces/Controllers/Admin/IAdminAgencyController";
import { IUpdateAgencyStatusUseCase } from "../../../Application/Interfaces/UseCases/Agency/IUpdateAgencyStatusUseCase";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";
import { GetAgenciesDTO, updateAgencyKycStatusDTO, } from "../../../Application/DTOs/Agency/AgencyDTO";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { IGetAgencyOverviewUseCase } from "../../../Application/Interfaces/UseCases/Agency/IGetAgencyOverviewUseCase";
import { parseBlockedQuery } from "../../../Domain/Utils/parseBlockedQuery";


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
