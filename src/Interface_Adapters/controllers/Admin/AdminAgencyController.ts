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
import { Agency } from "../../../Domain/Entities/Agency/Agency";
import { GetAgenciesDTO } from "../../../Application/Dto/Agency/agency.dto";
import { ApiResponse } from "../../presenters/ApiResponse";


@injectable()
export class AdminAgencyController implements IAdminAgencyController {

    constructor(
        @inject("IGetAgenciesUseCase") private _getAgenciesUseCase: IGetAgenciesUseCase,
        @inject("IGetAgencyWithKYCUseCase") private _getAgencyWithKYCUseCase: IGetAgencyWithKYCUseCase,
        @inject("IUpdateAgencyKycStatusUseCase") private _updateAgencyKycStatusUseCase: IUpdateAgencyKycStatusUseCase,
        @inject("IUpdateAgencyStatusUseCase") private _updateAgencyStatusUseCase: IUpdateAgencyStatusUseCase
    ) { }

    getAgencies = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { //////////////////////
        try {

            const dto: GetAgenciesDTO = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                search: req.query.search?.toString() || "",
                sortBy: req.query.sortBy?.toString() || "createdAt",
                sortOrder: req.query.sortOrder === "desc" ? "desc" : "asc",
                blocked: req.query.blocked === "true" ? true : req.query.blocked === "false" ? false : null,
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

    getAgencyById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { ////////////////////////
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

    updateAgencyKyc = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const agencyId = req.params.id;
            const status = req.body.status

            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
            const agencyData = await this._updateAgencyKycStatusUseCase.execute(agencyId, status)

            return res.status(STATUS.OK).json(agencyData)

        } catch (error) {
            next(error);
        }
    }

    updateAgencyStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const { isBlocked } = req.body;

            if (!id) {
                return res.status(STATUS.BAD_REQUEST).json({
                    success: false,
                    message: AGENCY_MESSAGES.ID_MISSING,
                })
            }

            const dto: { userId: string, isBlocked: boolean } = {
                userId: id,
                isBlocked
            }

            await this._updateAgencyStatusUseCase.execute(dto)

            return res.status(STATUS.OK).json({
                success: true,
                message: AGENCY_MESSAGES.KYC_STATUS_UPDATED,
            })


        } catch (error) {
            next(error)
        }
    }
}
