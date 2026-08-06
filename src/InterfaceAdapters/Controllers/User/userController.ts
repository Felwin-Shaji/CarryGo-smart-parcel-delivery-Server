import { Request, Response } from "express";
import { IUserController } from "../../Interfaces/Controllers/User/IUserController";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { inject, injectable } from "tsyringe";
import { IGetUserProfileUseCase } from "../../../Application/Interfaces/UseCases/User/IGetUserProfileUseCase";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessages";
import { BaseEditUserProfileRequestDto, UserResetPasswordRequestDTO } from "../../../Application/DTOs/User/UserDTO";
import { IEditUserProfileUseCase } from "../../../Application/Interfaces/UseCases/User/IEditUserProfileUseCase";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IUserReserUserPassword } from "../../../Application/Interfaces/UseCases/User/IResetUserPasswordUseCase";
import { AppError } from "../../../Domain/Utils/customError";

@injectable()
export class UserController implements IUserController {
    constructor(
        @inject("IGetUserProfileUseCase") private _getUserProfileUseCase: IGetUserProfileUseCase,
        @inject("IEditUserProfileUseCase") private _editUserProfileUseCase: IEditUserProfileUseCase,
        @inject("IUserReserUserPassword") private _userReserUserPassword: IUserReserUserPassword,
    ) { }

    getUserProfile = async (req: Request, res: Response): Promise<Response | void> => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)

        const userProfileData = await this._getUserProfileUseCase.execute(userId)

        return res.status(200).json(ApiResponse.success(
            USER_MESSAGES.PROFILE_FETCHED,
            userProfileData
        ))
    }

    updateUserProfile = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as BaseEditUserProfileRequestDto;
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)

        await this._editUserProfileUseCase.execute(userId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.PROFILE_UPDATED
            )
        )
    };

    resetUserPassword = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as UserResetPasswordRequestDTO;
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)

        await this._userReserUserPassword.execute(userId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.RESET_PASSWORD
            )
        )
    }
};