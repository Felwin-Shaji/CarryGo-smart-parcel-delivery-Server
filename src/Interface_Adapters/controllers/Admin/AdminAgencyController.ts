import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IGetAgenciesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/GetAgenciesUseCase";
import { IGetAgencyWithKYCUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { IUpdateAgencyKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAdminAgencyController } from "../../../Application/interfaces/Controllers_Interfaces/Admin_Interfaces/adminAgency.controller";
import { IUpdateAgencyStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyStatusUseCase";

@injectable()
export class AdminAgencyController implements IAdminAgencyController {

    constructor(
        @inject("IGetAgenciesUseCase") private _getAgenciesUseCase: IGetAgenciesUseCase,

        @inject("IGetAgencyWithKYCUseCase") private _getAgencyWithKYCUseCase: IGetAgencyWithKYCUseCase,

        @inject("IUpdateAgencyKycStatusUseCase") private _updateAgencyKycStatusUseCase: IUpdateAgencyKycStatusUseCase,

        @inject("IUpdateAgencyStatusUseCase") private _updateAgencyStatusUseCase: IUpdateAgencyStatusUseCase
    ) { }

    getAgencies = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const result = await this._getAgenciesUseCase.execute({
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                search: req.query.search?.toString() || "",
                sortBy: req.query.sortBy?.toString() || "",
                sortOrder: req.query.sortOrder === "desc" ? "desc" : "asc",
            });

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    getAgencyById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const agencyId = req.params.id;
            if (!agencyId) throw new AppError("Agency ID is missing");

            const result = await this._getAgencyWithKYCUseCase.execute(agencyId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    updateAgencyKyc = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const agencyId = req.params.id;
            const status = req.body.status

            if (!agencyId) throw new AppError("Agency ID is missing");
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
                    message: "userId required"
                })
            }

            const dto: { userId: string, isBlocked: boolean } = {
                userId: id,
                isBlocked
            }

            await this._updateAgencyStatusUseCase.execute(dto)

            return res.status(STATUS.OK).json({
                success: true,
                message: "Agency status updated"
            })


        } catch (error) {
            next(error)
        }
    }
}
