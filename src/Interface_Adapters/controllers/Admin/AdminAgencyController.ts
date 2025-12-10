import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IGetAgenciesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/GetAgenciesUseCase";
import { IGetAgencyWithKYCUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { IUpdateAgencyKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAdminAgencyController } from "../../../Application/interfaces/Controllers_Interfaces/Admin_Interfaces/adminAgency.controller";
import { IUpdateAgencyStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyStatusUseCase";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { GetAgenciesDTO, updateAgencyKycStatusDTO, } from "../../../Application/Dto/Agency/agency.dto";
import { ApiResponse } from "../../presenters/ApiResponse";


function parseBlockedQuery(value: unknown): boolean | null {
    if (value === "true") return true;
    if (value === "false") return false;
    return null;
}

@injectable()
export class AdminAgencyController implements IAdminAgencyController {

    constructor(
        @inject("IGetAgenciesUseCase") private _getAgenciesUseCase: IGetAgenciesUseCase,
        @inject("IGetAgencyWithKYCUseCase") private _getAgencyWithKYCUseCase: IGetAgencyWithKYCUseCase,
        @inject("IUpdateAgencyKycStatusUseCase") private _updateAgencyKycStatusUseCase: IUpdateAgencyKycStatusUseCase,
        @inject("IUpdateAgencyStatusUseCase") private _updateAgencyStatusUseCase: IUpdateAgencyStatusUseCase
    ) { }

    getAgencies = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { //////////////////////✅
        try {

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
        } catch (error) {
            next(error);
        }
    };

    getAgencyById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { ////////////////////////✅
        try {
            const agencyId = req.params.id;
            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

            const result = await this._getAgencyWithKYCUseCase.execute(agencyId);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    AGENCY_MESSAGES.FETCH_AGENCY_WITH_KYC,
                    result
                )
            );
        } catch (error) {
            next(error);
        }
    };

    updateAgencyKyc = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {////////////////////////
        try {
            const agencyId = req.params.id;
            const dto = req.body as updateAgencyKycStatusDTO;


            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
            const agencyStatus = await this._updateAgencyKycStatusUseCase.execute(agencyId, dto)

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    AGENCY_MESSAGES.KYC_STATUS_UPDATED,agencyStatus
                )
            )

        } catch (error) {
            next(error);
        }
    }

    updateAgencyStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { /////////////////////
        try {
            const agencyId = req.params.id;
            const { isBlocked } = req.body;

            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

            await this._updateAgencyStatusUseCase.execute(agencyId, isBlocked);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    AGENCY_MESSAGES.STATUS_UPDATED,
                )
            )

        } catch (error) {
            next(error);
        }
    }
}
