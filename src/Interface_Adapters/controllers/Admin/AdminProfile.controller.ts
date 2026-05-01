import { Request, Response } from "express";
import { IAdminProfileController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/IAdminProfileController";
import { inject, injectable } from "tsyringe";
import { IGetAdminProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/Admin/IGetAdminProfileUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { ADMIN_MESSAGES } from "../../../Infrastructure/constants/messages/adminMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { AdminResetPasswordRequestDTO, EditAdminProfileRequestDto } from "../../../Application/Dto/Admin/adminProfile.dto";
import { IEditAdminProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/Admin/IEditAdminProfileUseCase";
import { IResetAdminPasswordUsecase } from "../../../Application/interfaces/useCase_Interfaces/Admin/IResetAdminPasswordUscase";

@injectable()
export class AdminProfileController implements IAdminProfileController {
    constructor(
        @inject("IGetAdminProfileUseCase") private _getAdminProfileUseCase: IGetAdminProfileUseCase,
        @inject("IEditAdminProfileUseCase") private _editAdminProfileUseCase: IEditAdminProfileUseCase,
        @inject("IResetAdminPasswordUsecase") private _resetAdminPasswordUseCase: IResetAdminPasswordUsecase,
    ) { }

    getAdminProfile = async (req: Request, res: Response): Promise<Response | void> => {

        const adminId = req.user?.id;
        if (!adminId) throw new AppError(ADMIN_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)

        const adminProfileData = await this._getAdminProfileUseCase.execute(adminId)

        return res.status(200).json(
            ApiResponse.success(
                ADMIN_MESSAGES.PROFILE_FETCHED,
                adminProfileData
            )
        )
    };

    editAdminProfile = async (req: Request, res: Response): Promise<Response | void> => {
        const dto = req.body as EditAdminProfileRequestDto;
        const adminId = req.user?.id;

        if (!adminId) throw new AppError(ADMIN_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)

        const updatedAdminProfile = await this._editAdminProfileUseCase.execute(adminId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                ADMIN_MESSAGES.PROFILE_UPDATED,
                updatedAdminProfile
            )
        );
    };

    resetAdminPassword = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as AdminResetPasswordRequestDTO;
        const adminId = req.user?.id;

        if (!adminId) throw new AppError(ADMIN_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)
        await this._resetAdminPasswordUseCase.execute(adminId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                ADMIN_MESSAGES.PASSWORD_RESET_SUCCESS
            )
        );
    };

};