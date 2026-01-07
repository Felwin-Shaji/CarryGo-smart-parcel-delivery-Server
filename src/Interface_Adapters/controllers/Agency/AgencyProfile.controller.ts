import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { AgencyResetPasswordRequestDTO, EditAgencyProfileRequestDto } from "../../../Application/Dto/Agency/agencyProfile.dto";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { IAgencyProfileController } from "../../Interface/Controllers_Interfaces/Agency_Interfases/IAgencyProfileController";
import { IGetAgencyProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/IGetAgencyProfileUseCase";
import { IEditAgencyProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/IEditAgencyProfileUseCase";
import { IResetAgencyPasswordUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/IResetAgencyPasswordUseCase";


@injectable()
export class AgencyProfileController implements IAgencyProfileController {
    constructor(
        @inject("IGetAgencyProfileUseCase") private _getAgencyProfileUseCase: IGetAgencyProfileUseCase,
        @inject("IEditAgencyProfileUseCase") private _editAgencyProfileUseCase: IEditAgencyProfileUseCase,
        @inject("IResetAgencyPasswordUseCase") private _agencyResetAgencyPassword: IResetAgencyPasswordUseCase,
    ) { }

    getAgencyProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const agencyId = req.user?.id;
            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST)

            const agencyProfileData = await this._getAgencyProfileUseCase.execute(agencyId)

            return res.status(200).json(
                ApiResponse.success(
                    AGENCY_MESSAGES.PROFILE_FETCHED,
                    agencyProfileData
                ))
        }
        catch (error) {
            next(error);
        }
    }

    editAgencyProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const dto = req.body as EditAgencyProfileRequestDto;

            const agencyId = req.user?.id;
            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST)

            const updatedAgencyProfile = await this._editAgencyProfileUseCase.execute(agencyId, dto);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    AGENCY_MESSAGES.PROFILE_UPDATED,
                    updatedAgencyProfile
                )
            )
        }
        catch (error) {
            next(error)
        }
    };

    resetAgencyPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const dto = req.body as AgencyResetPasswordRequestDTO;

            const agencyId = req.user?.id;
            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

            await this._agencyResetAgencyPassword.execute(agencyId, dto);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    AGENCY_MESSAGES.PASSWORD_RESET
                )
            )
        } catch (error) {
            next(error)
        }
    }

}
